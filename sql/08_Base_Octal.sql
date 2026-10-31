/* dbo.IsOctal - port of base/octal.js (isOctal): '0o77', '077' or plain 0-7 digits; '_' only in the 0o form. */
CREATE OR ALTER FUNCTION dbo.IsOctal (@TheInput varchar(8000))
RETURNS TABLE
AS
RETURN
(
    SELECT Result = CASE WHEN @TheInput IS NULL THEN NULL
                         WHEN (UPPER(LEFT(a.v, 2)) = '0O' AND LEN(a.v + 'x') > 3 AND LEN(a.body + 'x') > 1 AND a.body COLLATE Latin1_General_BIN2 NOT LIKE '%[^0-7_]%' AND LEFT(a.body, 1) <> '_' AND RIGHT(a.body, 1) <> '_' AND a.body NOT LIKE '%[_][_]%') OR (NOT (UPPER(LEFT(a.v, 2)) = '0O' AND LEN(a.v + 'x') > 3) AND a.v NOT LIKE '%[_]%' AND LEN(a.v + 'x') > 1 AND a.v COLLATE Latin1_General_BIN2 NOT LIKE '%[^0-7]%') THEN CAST(1 AS bit) ELSE CAST(0 AS bit) END
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
        ('077', 1),
        ('07_7', 0),
        ('077_', 0),
        ('000077', 1),
        ('0o77', 1),
        ('0o77_', 0),
        ('0o_77_', 0),
        ('0o7__7', 0),
        ('0000877', 0),
        ('000o77', 0),
        ('000oo77', 0),
        ('053256462753462', 1),
        ('0o7_7', 1),
        ('77', 1),
        (CHAR(178), 0),
        (NULL, NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.IsOctal(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, -1) <> ISNULL(CAST(actual.Result AS int), -1)
)
    RAISERROR('IsOctal failed a test', 16, 1);
ELSE
    PRINT 'IsOctal: all tests passed';
GO

/* dbo.OctalToDecimal - port of toDecOctal. Returns the decimal string; returns the input unchanged
   when it is not a valid octal literal, and NULL when it has more than 41 digits, counting leading
   zeros (the longest that always fits decimal(38, 0)). */
CREATE OR ALTER FUNCTION dbo.OctalToDecimal (@TheInput varchar(8000))
RETURNS TABLE
AS
RETURN
(
    SELECT Result = CASE WHEN LEFT(a.v, 1) = '0' AND LEN(x.body + 'x') > 1 AND x.body COLLATE Latin1_General_BIN2 NOT LIKE '%[^0-7]%' THEN
                  CAST((SELECT SUM(CAST(SUBSTRING(x.body, LEN(x.body) - t.n, 1) AS decimal(38, 0)) * POWER(CAST(8 AS decimal(38, 0)), t.n))
                                  FROM dbo.Tally(CASE WHEN LEN(x.body) <= 41 THEN LEN(x.body) ELSE 0 END) AS t) AS varchar(50))
             ELSE a.v END
    FROM (SELECT v = @TheInput) AS a
    CROSS APPLY (SELECT body = CASE WHEN UPPER(LEFT(a.v, 2)) = '0O' THEN SUBSTRING(a.v, 3, 8000) ELSE SUBSTRING(a.v, 2, 8000) END) AS x
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
        ('077', '63'),
        ('0o17', '15'),
        ('0532', '346'),
        ('05325646', '1420198'),
        ('0O17', '15'),
        ('77', '77'),
        ('0o', '0o'),
        ('00', '0'),
        ('0' + CHAR(178), '0' + CHAR(178)),
        ('0o77777777777777777777777777777777777777777', '10633823966279326983230456482242756607'),
        ('0o777777777777777777777777777777777777777777', NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.OctalToDecimal(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, N'#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.Result, N'#NULL#')
)
    RAISERROR('OctalToDecimal failed a test', 16, 1);
ELSE
    PRINT 'OctalToDecimal: all tests passed';
GO
