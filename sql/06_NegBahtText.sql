/* dbo.NegBahtText - port of function/NEG.js: BahtText with a leading '-' read as 'ลบ'.
   Zero is not read as negative. '--5' (more than one leading minus) and any
   invalid amount return NULL.
   Depends on: BahtText. */
CREATE OR ALTER FUNCTION dbo.NegBahtText (@Money nvarchar(4000), @Ed bit)
RETURNS TABLE
AS
RETURN
(
    SELECT Result =
        CASE WHEN s.IsNeg = 1 AND b.Result <> N'ศูนย์บาทถ้วน'
             THEN N'ลบ' + b.Result
             ELSE b.Result
        END
    FROM (SELECT v = LTRIM(RTRIM(@Money))) AS a
    CROSS APPLY (SELECT IsNeg = CASE WHEN LEFT(a.v, 1) = N'-' AND LEFT(a.v, 2) <> N'--' THEN 1 ELSE 0 END) AS s
    CROSS APPLY dbo.BahtText(CASE WHEN s.IsNeg = 1 THEN SUBSTRING(a.v, 2, 4000) ELSE a.v END, @Ed, '') AS b
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
        (N'-0.67', 0, N'ลบหกสิบเจ็ดสตางค์'),
        (N'--0.67', 0, NULL),
        (N'-2000000000000.00', 0, N'ลบสองล้านล้านบาทถ้วน'),
        (N'-123', 0, N'ลบหนึ่งร้อยยี่สิบสามบาทถ้วน'),
        (N'-123n', 0, N'ลบหนึ่งร้อยยี่สิบสามบาทถ้วน'),
        (N'-8.00', 0, N'ลบแปดบาทถ้วน'),
        (N'-5678.00', 0, N'ลบห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน'),
        (N'-63147.89', 0, N'ลบหกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์'),
        (N'-51000001.00', 0, N'ลบห้าสิบเอ็ดล้านหนึ่งบาทถ้วน'),
        (N'-317.10', 0, N'ลบสามร้อยสิบเจ็ดบาทสิบสตางค์'),
        (N'-422.26', 0, N'ลบสี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์'),
        (N'-11.11', 0, N'ลบสิบเอ็ดบาทสิบเอ็ดสตางค์'),
        (N'-191415.11', 0, N'ลบหนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์'),
        (N'-1.01', 0, N'ลบหนึ่งบาทหนึ่งสตางค์'),
        (N'-๑.0๑', 0, N'ลบหนึ่งบาทหนึ่งสตางค์'),
        (N'-5678.46', 0, N'ลบห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์'),
        (N'-768,601,800,000,000', 0, N'ลบเจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน'),
        (N'101', 0, N'หนึ่งร้อยหนึ่งบาทถ้วน'),
        (N'101', 1, N'หนึ่งร้อยเอ็ดบาทถ้วน'),
        (N'-101', 0, N'ลบหนึ่งร้อยหนึ่งบาทถ้วน'),
        (N'-101', 1, N'ลบหนึ่งร้อยเอ็ดบาทถ้วน'),
        (N'-', 0, NULL),
        (N'-abc', 0, NULL),
        (N'0', 0, N'ศูนย์บาทถ้วน'),
        (N'-0', 0, N'ศูนย์บาทถ้วน'),
        (N'-0.00', 0, N'ศูนย์บาทถ้วน'),
        (N'lol', 0, NULL)
    ) AS testCases(TheInput, Ed, ExpectedOutput)
    OUTER APPLY dbo.NegBahtText(testCases.TheInput, testCases.Ed) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, N'#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.Result, N'#NULL#')
)
    RAISERROR('NegBahtText failed a test', 16, 1);
ELSE
    PRINT 'NegBahtText: all tests passed';
GO
