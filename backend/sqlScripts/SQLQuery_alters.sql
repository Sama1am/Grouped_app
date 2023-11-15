USE [GroupedApp]
GO

INSERT INTO [dbo].[ROLES]
           ([name])
     VALUES
           ('Project Manager'),
		   ('Programmer'),
		   ('Artist'),
		   ('Animator'),
		   ('UI/UX'),
		   ('Writer'),
		   ('Level designer'),
		   ('Character designer'),
		   ('3D artist'),
		   ('2D artist')
GO

UPDATE USERS
SET admin = 1 
WHERE email = 'svsvnst@gmail.com';
GO

ALTER TABLE SESSIONS
ADD [session_code] VARCHAR(50) NOT NULL
GO

ALTER TABLE USERS
ADD [student_number] INT 
GO

SELECT * FROM USERS
GO

UPDATE USERS
SET admin = 1 
WHERE email = 'groupeda7@gmail.com';
GO