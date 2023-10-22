CREATE DATABASE [GroupedApp]
GO

USE [GroupedApp]
GO

CREATE TABLE [USERS] 
(
    [user_id] INT IDENTITY(1,1) PRIMARY KEY,
    [name] VARCHAR(50) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
	[role_id] INT NOT NULL  
);
GO 

CREATE TABLE [ROLES] 
(
    [role_id] INT IDENTITY(1,1) PRIMARY KEY,
    [name] VARCHAR(50) NOT NULL
);
GO

CREATE TABLE [SESSIONS] 
(
    [session_id] INT IDENTITY(1,1) PRIMARY KEY,
    [session_name] VARCHAR(50) NOT NULL,
	[active] bit NOT NULL
);
GO

CREATE TABLE [SESSIONRESPONSE] 
(
    [response_id] INT IDENTITY(1,1) PRIMARY KEY,
	[session_id] INT,
    [user_id] INT,
	[team_id] INT

);
GO

CREATE TABLE [TEAMS] 
(
    [team_id] INT IDENTITY(1,1) PRIMARY KEY,
	[team_name] VARCHAR(50)
);
GO

ALTER TABLE [USERS] ADD FOREIGN KEY ([role_id]) REFERENCES [ROLES] ([role_id])
GO

ALTER TABLE [SESSIONRESPONSE] ADD FOREIGN KEY ([session_id]) REFERENCES [SESSIONS] ([session_id])
GO

ALTER TABLE [SESSIONRESPONSE] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([user_id])
GO

ALTER TABLE [SESSIONRESPONSE] ADD FOREIGN KEY ([team_id]) REFERENCES [TEAMS] ([team_id])
GO


INSERT INTO [dbo].[ROLES]
           ([name])
     VALUES
           ('Project Manager'),
		   ('Programmer'),
		   ('Artist')
GO

SELECT * FROM SESSIONS
GO

ALTER TABLE SESSIONS
ADD [max_group_members] INT
GO

ALTER TABLE USERS
ADD [admin] bit 
GO 

 
UPDATE USERS
SET admin = 0 
WHERE email = '2344023@students.wits.ac.za';
GO