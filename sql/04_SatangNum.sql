/* dbo.SatangNum - port of function/SatangNum.js
   Thai satang words ('ถ้วน', 'หนึ่ง' .. 'เก้าสิบเก้า') -> two-digit string '00'..'99'; NULL otherwise. */
CREATE OR ALTER FUNCTION dbo.SatangNum (@Word nvarchar(50))
RETURNS TABLE
AS
RETURN
(
    SELECT SatangNum =
        CASE WHEN @Word COLLATE Latin1_General_BIN2 = N'ถ้วน' THEN '00'
             ELSE (SELECT TOP (1) RIGHT('0' + CAST(t.n AS varchar(2)), 2)
                   FROM dbo.Tally(100) AS t
                   CROSS APPLY dbo.ThaiNumberText(t.n, 0) AS w
                   WHERE t.n > 0 AND w.ThaiText COLLATE Latin1_General_BIN2 = @Word)
        END
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
        (N'ถ้วน', N'00'),
        (N'หนึ่ง', N'01'),
        (N'สอง', N'02'),
        (N'สาม', N'03'),
        (N'สี่', N'04'),
        (N'ห้า', N'05'),
        (N'หก', N'06'),
        (N'เจ็ด', N'07'),
        (N'แปด', N'08'),
        (N'เก้า', N'09'),
        (N'สิบ', N'10'),
        (N'สิบเอ็ด', N'11'),
        (N'สิบสอง', N'12'),
        (N'สิบสาม', N'13'),
        (N'สิบสี่', N'14'),
        (N'สิบห้า', N'15'),
        (N'สิบหก', N'16'),
        (N'สิบเจ็ด', N'17'),
        (N'สิบแปด', N'18'),
        (N'สิบเก้า', N'19'),
        (N'ยี่สิบ', N'20'),
        (N'ยี่สิบเอ็ด', N'21'),
        (N'ยี่สิบสอง', N'22'),
        (N'ยี่สิบสาม', N'23'),
        (N'ยี่สิบสี่', N'24'),
        (N'ยี่สิบห้า', N'25'),
        (N'ยี่สิบหก', N'26'),
        (N'ยี่สิบเจ็ด', N'27'),
        (N'ยี่สิบแปด', N'28'),
        (N'ยี่สิบเก้า', N'29'),
        (N'สามสิบ', N'30'),
        (N'สามสิบเอ็ด', N'31'),
        (N'สามสิบสอง', N'32'),
        (N'สามสิบสาม', N'33'),
        (N'สามสิบสี่', N'34'),
        (N'สามสิบห้า', N'35'),
        (N'สามสิบหก', N'36'),
        (N'สามสิบเจ็ด', N'37'),
        (N'สามสิบแปด', N'38'),
        (N'สามสิบเก้า', N'39'),
        (N'สี่สิบ', N'40'),
        (N'สี่สิบเอ็ด', N'41'),
        (N'สี่สิบสอง', N'42'),
        (N'สี่สิบสาม', N'43'),
        (N'สี่สิบสี่', N'44'),
        (N'สี่สิบห้า', N'45'),
        (N'สี่สิบหก', N'46'),
        (N'สี่สิบเจ็ด', N'47'),
        (N'สี่สิบแปด', N'48'),
        (N'สี่สิบเก้า', N'49'),
        (N'ห้าสิบ', N'50'),
        (N'ห้าสิบเอ็ด', N'51'),
        (N'ห้าสิบสอง', N'52'),
        (N'ห้าสิบสาม', N'53'),
        (N'ห้าสิบสี่', N'54'),
        (N'ห้าสิบห้า', N'55'),
        (N'ห้าสิบหก', N'56'),
        (N'ห้าสิบเจ็ด', N'57'),
        (N'ห้าสิบแปด', N'58'),
        (N'ห้าสิบเก้า', N'59'),
        (N'หกสิบ', N'60'),
        (N'หกสิบเอ็ด', N'61'),
        (N'หกสิบสอง', N'62'),
        (N'หกสิบสาม', N'63'),
        (N'หกสิบสี่', N'64'),
        (N'หกสิบห้า', N'65'),
        (N'หกสิบหก', N'66'),
        (N'หกสิบเจ็ด', N'67'),
        (N'หกสิบแปด', N'68'),
        (N'หกสิบเก้า', N'69'),
        (N'เจ็ดสิบ', N'70'),
        (N'เจ็ดสิบเอ็ด', N'71'),
        (N'เจ็ดสิบสอง', N'72'),
        (N'เจ็ดสิบสาม', N'73'),
        (N'เจ็ดสิบสี่', N'74'),
        (N'เจ็ดสิบห้า', N'75'),
        (N'เจ็ดสิบหก', N'76'),
        (N'เจ็ดสิบเจ็ด', N'77'),
        (N'เจ็ดสิบแปด', N'78'),
        (N'เจ็ดสิบเก้า', N'79'),
        (N'แปดสิบ', N'80'),
        (N'แปดสิบเอ็ด', N'81'),
        (N'แปดสิบสอง', N'82'),
        (N'แปดสิบสาม', N'83'),
        (N'แปดสิบสี่', N'84'),
        (N'แปดสิบห้า', N'85'),
        (N'แปดสิบหก', N'86'),
        (N'แปดสิบเจ็ด', N'87'),
        (N'แปดสิบแปด', N'88'),
        (N'แปดสิบเก้า', N'89'),
        (N'เก้าสิบ', N'90'),
        (N'เก้าสิบเอ็ด', N'91'),
        (N'เก้าสิบสอง', N'92'),
        (N'เก้าสิบสาม', N'93'),
        (N'เก้าสิบสี่', N'94'),
        (N'เก้าสิบห้า', N'95'),
        (N'เก้าสิบหก', N'96'),
        (N'เก้าสิบเจ็ด', N'97'),
        (N'เก้าสิบแปด', N'98'),
        (N'เก้าสิบเก้า', N'99'),
        (N'ร้อย', NULL),
        (NULL, NULL),
        (N'abc', NULL)
    ) AS testCases(TheInput, ExpectedOutput)
    OUTER APPLY dbo.SatangNum(testCases.TheInput) AS actual
    WHERE ISNULL(testCases.ExpectedOutput, N'#NULL#') COLLATE Latin1_General_BIN2 <> ISNULL(actual.SatangNum, N'#NULL#')
)
    RAISERROR('SatangNum failed a test', 16, 1);
ELSE
    PRINT 'SatangNum: all tests passed';
GO
