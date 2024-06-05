START TRANSACTION
SET time_zone = "+00:00";

--
-- Creación de tablas
--

CREATE TABLE IF NOT EXISTS `users` (
                                       `user_id` int(11) NOT NULL,
                                       `email`  varchar(255) NOT NULL,
                                       `password` varchar(255) NOT NULL,
                                       `nombre` varchar(100) NOT NULL,
                                       `apellido` varchar(100) NOT NULL,
                                       `admin` boolean NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `courses` (
                                         `course_id` int(11) NOT NULL,
                                         `nombre` varchar(100) NOT NULL,
                                         `profesor_id`  int(11) NOT NULL,
                                         `categoria` varchar(100) NOT NULL,
                                         `descripcion` VARCHAR(500) NOT NULL,
                                         `valoracion` float NOT NULL,
                                         `duracion` INT NOT NULL,
                                         `requisitos` VARCHAR(500) NOT NULL,
                                         `url_image` VARCHAR(400) NOT NULL,
                                         `fecha_inicio` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `users_x_courses` (
                                                 `users_x_courses_id` int(11) NOT NULL,
                                                 `user_id` int(11) NOT NULL,
                                                 `course_id` int(11) NOT NULL,
                                                 `fecha_inscripcion` DATE NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indexado de tablas
--

ALTER TABLE `users`
    ADD PRIMARY KEY (`user_id`),
    ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `courses`
    ADD PRIMARY KEY (`course_id`),
    ADD UNIQUE KEY `nombre` (`nombre`);
-- ADD KEY `profesor_id` (`user_id`);

ALTER TABLE `users_x_courses`
    ADD PRIMARY KEY (`users_x_courses_id`),
    ADD UNIQUE KEY `users_x_courses_id2` (`user_id`, `course_id`, `fecha_inscripcion`);

--
-- Autoincrementado de tablas
--

ALTER TABLE `users`
    MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `courses`
    MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `users_x_courses`
    MODIFY `users_x_courses_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Rellenado de tablas
--
INSERT INTO `users` (`user_id`,`email`, `password`, `nombre`, `apellido`, `admin`) VALUES
                                                                                       (1, 'sofiaolivetoo@gmail.com', 'ba77a5448b1208afe6effd5194c2a8b6', 'Sofia', 'Oliveto', false),
                                                                                       (2, 'juanlopez@gmail.com', 'f5737d25829e95b9c234b7fa06af8736', 'Juan', 'Lopez', true),
                                                                                       (3, 'constanzastrumia@gmail.com', 'febf04180a62e8710868cafd8741515f', 'Constanza', 'Strumia', false),
                                                                                       (4, 'margarita@gmail.com', '828fca74e9e1d7e55b76d46a304b5f55', 'Margarita', 'Lopez', true);

INSERT INTO `courses` (`course_id`,`nombre`, `profesor_id`, `categoria`, `descripcion`, `valoracion`, `duracion`, `requisitos`, `url_image`, `fecha_inicio`) VALUES
                                                                                                                                                                 (1,'goland' , 2, 'programacion', 'curso basico de programacion de goland', 4.5, 90000,'ninguno','https://hireline.io/blog/wp-content/uploads/2022/07/habilidades-de-un-programador-1200x900.jpg','2020-06-09'),
                                                                                                                                                                 (2,'bartender' , 2, 'cocteleria', 'aprende a hacer los mejores tragos', 3.7, 45,'ninguno','https://www.camarero10.com/wp-content/uploads/2022/05/bartender-para-bares-y-restaurantes-1200x900.jpg','2024-06-03'),
                                                                                                                                                                 (3,'peluqueria_intensiva', 4, 'belleza', 'aprende a hacer desde simples trenzas hasta peinados elaborados', 4.2, 80, 'habilidades basicas de manejo de cabello','https://joseppons.com/formacion/wp-content/uploads/2019/06/abrir-tu-salon-peluqueria.jpg', '2024-07-10');
COMMIT;