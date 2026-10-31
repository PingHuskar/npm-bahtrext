/* dbo.IsHexadecimal - port of base/hexadecimal.js (isHex): '0x' + hex digits, single '_' allowed between digits. */
CREATE OR ALTER FUNCTION dbo.IsHexadecimal (@TheInput varchar(8000))
RETURNS TABLE
AS
RETURN
(
    SELECT Result = CASE WHEN @TheInput IS NULL THEN NULL
                         WHEN UPPER(LEFT(a.v, 2)) = '0X' AND LEN(a.body + 'x') > 1 AND UPPER(a.body) COLLATE Latin1_General_BIN2 NOT LIKE '%[^0-9A-F_]%' AND LEFT(a.body, 1) <> '_' AND RIGHT(a.body, 1) <> '_' AND a.body NOT LIKE '%[_][_]%' THEN CAST(1 AS bit) ELSE CAST(0 AS bit) END
    FROM (SELECT v = @TheInput, body = SUBSTRING(@TheInput, 3, 8000)) AS a
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
        ('0x101A010', 1),
        ('0x1F', 1),
        ('0X1F', 1),
        ('0x0F', 1),
        ('0X0E', 1),
        ('0x101_A010', 1),
        ('0x1_F', 1),
        ('0X1_F', 1),
        ('0x0_F', 1),
        ('0X0_E', 1),
        ('0X001010101010A01C01010F1011E001010010010100100001010010001001', 1),
        ('0x101__A010', 0),
        ('0x1__F', 0),
        ('0X1__F', 0),
        ('0x0_F_', 0),
        ('0X_0_E', 0),
        ('0xVb', 0),
        ('0xb10W13010', 0),
        ('0x7G7', 0),
        ('0x00V077', 0),
        ('0xo7M7', 0),
        ('0x0T00877', 0),
        ('0x00po77', 0),
        ('00x0ozo77', 0),
        ('053x2564627R53462', 0),
        (NULL, NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.IsHexadecimal(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, -1) <> ISNULL(CAST(actual.Result AS int), -1)
)
    RAISERROR('IsHexadecimal failed a test', 16, 1);
ELSE
    PRINT 'IsHexadecimal: all tests passed';
GO

/* dbo.HexadecimalToDecimal - port of toHex. Returns the decimal string; returns the input unchanged
   when it is not a valid hexadecimal literal, and NULL when it has more than 31 digits, counting leading
   zeros (the longest that always fits decimal(38, 0)). */
CREATE OR ALTER FUNCTION dbo.HexadecimalToDecimal (@TheInput varchar(8000))
RETURNS TABLE
AS
RETURN
(
    SELECT Result = CASE WHEN UPPER(LEFT(a.v, 2)) = '0X' AND LEN(x.body + 'x') > 1 AND UPPER(x.body) COLLATE Latin1_General_BIN2 NOT LIKE '%[^0-9A-F]%' THEN
                  CAST((SELECT SUM(CAST(CHARINDEX(UPPER(SUBSTRING(x.body, LEN(x.body) - t.n, 1)) COLLATE Latin1_General_BIN2, '0123456789ABCDEF') - 1 AS decimal(38, 0)) * POWER(CAST(16 AS decimal(38, 0)), t.n))
                                  FROM dbo.Tally(CASE WHEN LEN(x.body) <= 31 THEN LEN(x.body) ELSE 0 END) AS t) AS varchar(50))
             ELSE a.v END
    FROM (SELECT v = @TheInput) AS a
    CROSS APPLY (SELECT body = SUBSTRING(a.v, 3, 8000)) AS x
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
        ('077', '077'),
        ('0o17', '0o17'),
        ('0532', '0532'),
        ('05325646', '05325646'),
        ('0x71', '113'),
        ('0x7abc', '31420'),
        ('0x0123456789AB', '1250999896491'),
        ('0x0123456789ABCDEF', '81985529216486895'),
        ('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', '21267647932558653966460912964485513215'),
        ('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.HexadecimalToDecimal(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, N'#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.Result, N'#NULL#')
)
    RAISERROR('HexadecimalToDecimal failed a test', 16, 1);
ELSE
    PRINT 'HexadecimalToDecimal: all tests passed';
GO
