/* dbo.Tally - helper: the integers 0 .. @Count-1 (max 10,000 rows). */
CREATE OR ALTER FUNCTION dbo.Tally (@Count int)
RETURNS TABLE
AS
RETURN
(
    SELECT TOP (CASE WHEN @Count > 0 THEN @Count ELSE 0 END)
           n = ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) - 1
    FROM (VALUES (0),(0),(0),(0),(0),(0),(0),(0),(0),(0)) AS a(x)
    CROSS JOIN (VALUES (0),(0),(0),(0),(0),(0),(0),(0),(0),(0)) AS b(x)
    CROSS JOIN (VALUES (0),(0),(0),(0),(0),(0),(0),(0),(0),(0)) AS c(x)
    CROSS JOIN (VALUES (0),(0),(0),(0),(0),(0),(0),(0),(0),(0)) AS d(x)
    ORDER BY n
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
        (0, '0/-1'),
        (1, '1/0'),
        (5, '5/4'),
        (100, '100/99'),
        (10000, '10000/9999'),
        (-3, '0/-1')
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY (SELECT Result = (SELECT CAST(COUNT(*) AS varchar(10)) + '/' + CAST(ISNULL(MAX(n), -1) AS varchar(10)) FROM dbo.Tally(testCases.TheInput))) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, '#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.Result, '#NULL#')
)
    RAISERROR('Tally failed a test', 16, 1);
ELSE
    PRINT 'Tally: all tests passed';
GO
