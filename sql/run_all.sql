-- Run with sqlcmd in SQLCMD mode (SSMS: Query > SQLCMD Mode), from this folder:
--   sqlcmd -S <server> -d <database> -f 65001 -i run_all.sql -b   (-f 65001 = UTF-8 for the Thai text)
-- Each script (re)creates its function and then runs its build-time tests;
-- -b makes sqlcmd stop with a non-zero exit code if a test raises an error.
-- Order matters: later scripts depend on earlier functions.
:on error exit
:r 00_Tally.sql
:r 01_TrimLeadingZeros.sql
:r 02_ThaiNumberText.sql
:r 03_PrintSatangs.sql
:r 04_SatangNum.sql
:r 05_BahtText.sql
:r 06_NegBahtText.sql
:r 07_Base_Binary.sql
:r 08_Base_Octal.sql
:r 09_Base_Hexadecimal.sql
