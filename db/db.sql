CREATE DATABASE IF NOT EXISTS dbarquisoft1;
USE dbarquisoft1;

-- SET SQL_MODE para permitir 0 en AUTO_INCREMENT solo si es necesario
-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;
SET time_zone = "+00:00";

-- Creación de tablas
CREATE TABLE IF NOT EXISTS `users` (
                                       `user_id` INT AUTO_INCREMENT PRIMARY KEY,
                                       `email` VARCHAR(100) NOT NULL,
                                       `password` VARCHAR(100) NOT NULL,
                                       `nombre` VARCHAR(100) NOT NULL,
                                       `apellido` VARCHAR(100) NOT NULL,
                                       `admin` BOOLEAN NOT NULL,
                                       UNIQUE KEY `email` (`email`),  -- Asegura que no haya emails duplicados
                                       INDEX `apellido` (`apellido`)  -- Índice para mejorar el rendimiento de las consultas por apellido
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `courses` (
                                         `course_id` INT AUTO_INCREMENT PRIMARY KEY,
                                         `nombre` VARCHAR(100) NOT NULL,
                                         `profesor_id` INT NOT NULL,
                                         `categoria` VARCHAR(100) NOT NULL,
                                         `descripcion` VARCHAR(500) NOT NULL,
                                         `valoracion` FLOAT NOT NULL,
                                         `duracion` INT NOT NULL,
                                         `requisitos` VARCHAR(500) NOT NULL,
                                         `url_image` VARCHAR(400) NOT NULL,
                                         `fecha_inicio` DATE NOT NULL,
                                         FOREIGN KEY (`profesor_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
                                         UNIQUE KEY `nombre` (`nombre`),  -- Asegura que no haya cursos con el mismo nombre
                                         INDEX `categoria` (`categoria`),  -- Índices para mejorar el rendimiento de las consultas
                                         INDEX `valoracion` (`valoracion`),
                                         INDEX `duracion` (`duracion`),
                                         INDEX `fecha_inicio` (`fecha_inicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `users_x_courses` (
                                                 `users_x_courses_id` INT AUTO_INCREMENT PRIMARY KEY,
                                                 `user_id` INT NOT NULL,
                                                 `course_id` INT NOT NULL,
                                                 `fecha_inscripcion` DATE NOT NULL,
                                                 FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
                                                 FOREIGN KEY (`course_id`) REFERENCES `courses`(`course_id`) ON DELETE CASCADE,
                                                 UNIQUE KEY `users_x_courses_2` (`user_id`, `course_id`, `fecha_inscripcion`), -- Asegura que una misma combinación no se repita
                                                 INDEX `fecha_inscripcion` (`fecha_inscripcion`)  -- Índice para mejorar el rendimiento de las consultas por fecha de inscripción
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Rellenado de tablas
-- Insertar datos sin especificar `user_id` porque es AUTO_INCREMENT
INSERT INTO `users` (`email`, `password`, `nombre`, `apellido`, `admin`) VALUES
                                                                             ('sofiaolivetoo@gmail.com', 'sofi123', 'Sofia', 'Oliveto', false),
                                                                             ('juanlopez@gmail.com', 'juan123', 'Juan', 'Lopez', true),
                                                                             ('constanzastrumia@gmail.com', 'coti123', 'Constanza', 'Strumia', false);

COMMIT;
