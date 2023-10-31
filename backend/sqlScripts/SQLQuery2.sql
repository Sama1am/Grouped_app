CREATE DATABASE [GroupedApp]
GO

USE [GroupedApp]
GO

CREATE TABLE [USERS] 
(
    [user_id] INT IDENTITY(1,1) PRIMARY KEY,
    [name] VARCHAR(50) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
	[role_id] INT NOT NULL,
	[admin] bit 
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
	[active] bit NOT NULL,
	[max_group_members] INT
);
GO

ALTER TABLE [USERS] ADD FOREIGN KEY ([role_id]) REFERENCES [ROLES] ([role_id])
GO



