/* dbo.IsBinary - port of base/binary.js (isBin): '0b' + 0/1 digits, single '_' allowed between digits. */
CREATE OR ALTER FUNCTION dbo.IsBinary (@TheInput varchar(8000))
RETURNS TABLE
AS
RETURN
(
    SELECT Result = CASE WHEN @TheInput IS NULL THEN NULL
                         WHEN UPPER(LEFT(a.v, 2)) = '0B' AND LEN(a.body + 'x') > 1 AND a.body COLLATE Latin1_General_BIN2 NOT LIKE '%[^01_]%' AND LEFT(a.body, 1) <> '_' AND RIGHT(a.body, 1) <> '_' AND a.body NOT LIKE '%[_][_]%' THEN CAST(1 AS bit) ELSE CAST(0 AS bit) END
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
        ('0b101010', 1),
        ('0b1_0101_0', 1),
        ('0b1', 1),
        ('0B1', 1),
        ('0b0', 1),
        ('0B0', 1),
        ('0B00101010101001010101011001010010010100100001010010001001', 1),
        ('0b', 0),
        ('0b1_', 0),
        ('0b0_', 0),
        ('0b_0_', 0),
        ('0b_1', 0),
        ('0b0_1010__111', 0),
        ('0b01_101010_', 0),
        ('0b1013010', 0),
        ('077', 0),
        ('000077', 0),
        ('0o77', 0),
        ('0000877', 0),
        ('000o77', 0),
        ('000oo77', 0),
        ('053256462753462', 0),
        ('0b' + CHAR(185), 0),
        (NULL, NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.IsBinary(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, -1) <> ISNULL(CAST(actual.Result AS int), -1)
)
    RAISERROR('IsBinary failed a test', 16, 1);
ELSE
    PRINT 'IsBinary: all tests passed';
GO

/* dbo.BinaryToDecimal - port of toDecBin. Returns the decimal string; returns the input unchanged
   when it is not a valid binary literal, and NULL when it has more than 126 digits, counting leading
   zeros (the longest that always fits decimal(38, 0)). */
CREATE OR ALTER FUNCTION dbo.BinaryToDecimal (@TheInput varchar(8000))
RETURNS TABLE
AS
RETURN
(
    SELECT Result = CASE WHEN UPPER(LEFT(a.v, 2)) = '0B' AND LEN(x.body + 'x') > 1 AND x.body COLLATE Latin1_General_BIN2 NOT LIKE '%[^01]%' THEN
                  CAST((SELECT SUM(CAST(SUBSTRING(x.body, LEN(x.body) - t.n, 1) AS decimal(38, 0)) * POWER(CAST(2 AS decimal(38, 0)), t.n))
                                  FROM dbo.Tally(CASE WHEN LEN(x.body) <= 126 THEN LEN(x.body) ELSE 0 END) AS t) AS varchar(50))
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
        ('0b101010', '42'),
        ('0b1', '1'),
        ('0B1', '1'),
        ('0b0', '0'),
        ('0B0', '0'),
        ('0B00101010101001010101011001010010010100100001010010001001', '12003739188728969'),
        ('0b111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', '85070591730234615865843651857942052863'),
        ('0b1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.BinaryToDecimal(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, N'#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.Result, N'#NULL#')
)
    RAISERROR('BinaryToDecimal failed a test', 16, 1);
ELSE
    PRINT 'BinaryToDecimal: all tests passed';
GO
