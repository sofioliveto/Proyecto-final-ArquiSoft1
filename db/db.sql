CREATE DATABASE IF NOT EXISTS dbarquisoft1;
USE dbarquisoft1;



CREATE TABLE IF NOT EXISTS User (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Course (
    CursoId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    ProfesorId INT NOT NULL,
    Categoria VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Valoracion FLOAT NOT NULL,
    Duracion INT NOT NULL,
    Requisitos VARCHAR(500) NOT NULL,
    Url_image VARCHAR(400) NOT NULL,
    FechaInicio DATE NOT NULL,
    FOREIGN KEY (ProfesorId) REFERENCES User(UserId)
);

CREATE TABLE IF NOT EXISTS UsersXCourses (
UsersXCoursesId INT AUTO_INCREMENT PRIMARY KEY,
UserId INT NOT NULL,
CourseId INT NOT NULL,
FechaInscripcion DATE NOT NULL,
FOREIGN KEY (UserId) REFERENCES User(UserId),
FOREIGN KEY (CourseId) REFERENCES Course(CursoId)
);