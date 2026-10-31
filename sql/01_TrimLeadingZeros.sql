/* dbo.TrimLeadingZeros - port of snippet/removeLeadingZeros.js
   Returns the input without its leading '0' characters ('' if all zeros). */
CREATE OR ALTER FUNCTION dbo.TrimLeadingZeros (@TheInput varchar(8000))
RETURNS TABLE
AS
RETURN
(
    SELECT WithoutLeadingZeros =
        SUBSTRING(@TheInput, PATINDEX('%[^0]%', (@TheInput + '.') COLLATE Latin1_General_BIN2), LEN(@TheInput + 'x') - 1)
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
        ('0296009', '296009'),
        ('3218', '3218'),
        ('0', ''),
        ('0000', ''),
        ('000123', '123'),
        ('100', '100'),
        ('0.5', '.5'),
        ('00.50', '.50'),
        ('', ''),
        (NULL, NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.TrimLeadingZeros(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, '#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.WithoutLeadingZeros, '#NULL#')
)
    RAISERROR('TrimLeadingZeros failed a test', 16, 1);
ELSE
    PRINT 'TrimLeadingZeros: all tests passed';
GO
