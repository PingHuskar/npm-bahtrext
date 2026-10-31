/* dbo.PrintSatangs - port of function/PrintSatangs.js
   @Satangs: the digits after the decimal point; @Rounding: '' (none; more than
   two non-zero-tail digits are invalid), 'c' (ceiling) or 'f' (floor).
   Word  = 'ถ้วน' for zero (or a carry into the baht), '<n>สตางค์' otherwise, NULL if invalid.
   Carry = 1 when ceiling rounding reaches 100 satang. */
CREATE OR ALTER FUNCTION dbo.PrintSatangs (@Satangs varchar(8000), @Rounding char(1))
RETURNS TABLE
AS
RETURN
(
    SELECT Word =
               CASE WHEN c.IsDigits = 0 THEN NULL
                    WHEN c.IsZero = 1 THEN N'ถ้วน'
                    WHEN c.TooLong = 1 THEN NULL
                    WHEN c.Satang BETWEEN 1 AND 99 THEN t.ThaiText + N'สตางค์'
                    ELSE N'ถ้วน'
               END,
           Carry = CASE WHEN c.IsDigits = 1 AND c.IsZero = 0 AND c.TooLong = 0 AND c.Satang >= 100
                        THEN 1 ELSE 0 END
    FROM (SELECT s = ISNULL(@Satangs, ''), r = ISNULL(RTRIM(@Rounding), '')) AS a
    CROSS APPLY
    (SELECT IsDigits = CASE WHEN a.s COLLATE Latin1_General_BIN2 LIKE '%[^0-9]%' THEN 0 ELSE 1 END,
            IsZero   = CASE WHEN a.s COLLATE Latin1_General_BIN2 NOT LIKE '%[^0]%' THEN 1 ELSE 0 END,
            TooLong  = CASE WHEN a.r = '' AND SUBSTRING(a.s, 3, 8000) COLLATE Latin1_General_BIN2 LIKE '%[^0]%' THEN 1 ELSE 0 END,
            Satang   = TRY_CAST(LEFT(a.s + '00', 2) AS int)
                     + CASE WHEN a.r = 'c' AND SUBSTRING(a.s, 3, 8000) COLLATE Latin1_General_BIN2 LIKE '%[^0]%' THEN 1 ELSE 0 END
    ) AS c
    CROSS APPLY dbo.ThaiNumberText(CASE WHEN c.Satang BETWEEN 1 AND 99 THEN c.Satang END, 0) AS t
);
GO

/* ---------------------------------------------------------------------------
   Tests: run every time this script is executed (build-time tests).
   Each row of the VALUES table is (inputs..., expected output). Any row whose
   actual result differs from the expected one makes the batch raise an error.
   --------------------------------------------------------------------------- */
GO
IF EXISTS
(
    SELECT *
    FROM (VALUES
        ('67', '', N'หกสิบเจ็ดสตางค์', 0),
        ('37', '', N'สามสิบเจ็ดสตางค์', 0),
        ('31', '', N'สามสิบเอ็ดสตางค์', 0),
        ('21', '', N'ยี่สิบเอ็ดสตางค์', 0),
        ('01', '', N'หนึ่งสตางค์', 0),
        ('1', '', N'สิบสตางค์', 0),
        ('', '', N'ถ้วน', 0),
        ('0', '', N'ถ้วน', 0),
        ('00', '', N'ถ้วน', 0),
        ('0000', '', N'ถ้วน', 0),
        ('dd', '', NULL, 0),
        ('999', '', NULL, 0),
        ('', 'c', N'ถ้วน', 0),
        ('9900000000000000001', 'c', N'ถ้วน', 1),
        ('99', 'c', N'เก้าสิบเก้าสตางค์', 0),
        ('499', 'c', N'ห้าสิบสตางค์', 0),
        ('490000000000001', 'c', N'ห้าสิบสตางค์', 0),
        ('499', 'f', N'สี่สิบเก้าสตางค์', 0),
        ('49239480239', 'f', N'สี่สิบเก้าสตางค์', 0),
        ('5', '', N'ห้าสิบสตางค์', 0),
        ('10', 'c', N'สิบสตางค์', 0),
        ('001', 'c', N'หนึ่งสตางค์', 0),
        ('001', 'f', N'ถ้วน', 0),
        ('12', 'c', N'สิบสองสตางค์', 0),
        ('999', 'f', N'เก้าสิบเก้าสตางค์', 0),
        ('100', '', N'สิบสตางค์', 0),
        ('120', '', N'สิบสองสตางค์', 0),
        ('340', '', N'สามสิบสี่สตางค์', 0),
        ('100', 'f', N'สิบสตางค์', 0),
        ('019', 'c', N'สองสตางค์', 0),
        ('995', 'c', N'ถ้วน', 1),
        (CHAR(178) + '1', '', NULL, 0)
    ) AS testCases(TheInput, Rounding, ExpectedWord, ExpectedCarry)
    OUTER APPLY dbo.PrintSatangs(testCases.TheInput, testCases.Rounding) AS actual
    WHERE ISNULL(testCases.ExpectedWord, N'#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.Word, N'#NULL#') OR testCases.ExpectedCarry <> ISNULL(actual.Carry, -1)
)
    RAISERROR('PrintSatangs failed a test', 16, 1);
ELSE
    PRINT 'PrintSatangs: all tests passed';
GO
