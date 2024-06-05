START TRANSACTION;
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
    `valoracion` decimal(2,1) NOT NULL,
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
                                                                                       (4, 'margarita@gmail.com', '828fca74e9e1d7e55b76d46a304b5f55', 'Margarita', 'de Marcos', true),
                                                                                       (5, 'pedro@gmail.com','d3ce9efea6244baa7bf718f12dd0c331','Pedro','Juarez',false),
                                                                                       (6, 'josefinagonzalez@gmail.com','e577bc7b26b52afe6a33f02513b86b5c','Josefina', 'Gonzalez',false),
                                                                                       (7, 'ramiropaez@gmail.com','8e7a60d71791c1febdbc4998c963e87e','Ramiro', 'Paez', false),
                                                                                       (8, 'gustavojacobo@gmail.com','0805446e686aa72d45f9583f2d6cedef','Gustavo', 'Jacobo', true),
                                                                                       (9, 'matigarcia@gmail.com','0596f701227172915b2862b95b4c2e1a', 'Matias', 'Portillo', false),
                                                                                       (10, 'juliomansilla@gmail.com','16880e98af692b72ce3ba695654ee306', 'Julio', 'Mansilla', false),
                                                                                       (11, 'santiportillo@gmail.com','d5116c2a9607b0ea07d425506f610467', 'Santiago', 'Portillo', false),
                                                                                       (12, 'nicolasfigueroa@gmail.com','305735d035e7f7381d64d179126ff6d9', 'Nicolas', 'Figueroa', false),
                                                                                       (13, 'agostinacisneros@gmail.com','0a9827114b460ae8f2f96c5e8893c90d', 'Agostina', 'Cisneros', false),
                                                                                       (14, 'luciabernardi@gmail.com','b9ce57d6d6c2d6fda25d80da5a00a7d1', 'Lucia', 'Bernardi', false),
                                                                                       (15, 'pauladominguez@gmail.com','ca46a79286419c05172ca7b010a59d3c', 'Paula', 'Dominguez', false),
                                                                                       (16, 'luciovelarde@gmail.com','f4a1f4d408e436f3c294bf2ae346b3d7', 'Lucio', 'Velarde', false),
                                                                                       (17, 'rodolfoperez@gmail.com','4a2b3910b547e5212914378adaf76aac', 'Rodolfo', 'Perez', true),
                                                                                       (18, 'sebastiancolidio@gmail.com','5a7c2cf0d17f9d32c87de8efb8e689d6', 'Sebastian', 'Colidio', true),
                                                                                       (19, 'lucasbeltran@gmail.com','6d16ba70238c92a03ac04c7c86eb79e7', 'Lucas', 'Beltran', true),
                                                                                       (20, 'chilenodiaz@gmail.com','4494d10dc9752cba4083ce2cf8983d2c', 'Paulo', 'Diaz', false);

INSERT INTO `courses` (`course_id`,`nombre`, `profesor_id`, `categoria`, `descripcion`, `valoracion`, `duracion`, `requisitos`, `url_image`, `fecha_inicio`) VALUES
                                                                                        (1, 'golang para principiantes' , 8, 'programacion', 'curso basico de programacion de golang', 5, 9000,'bajo', ' ', '2020-06-09'),
                                                                                        (2, 'bartender ricos tragos' , 2, 'cocteleria', 'aprende a hacer los mejores tragos', 3.7, 45,'bajo', ' ', '2024-06-03'),
                                                                                        (3, 'peluqueria intensiva', 4, 'belleza', 'aprende a hacer desde simples trenzas hasta peinados elaborados', 4.2, 80, 'bajo', ' ', '2024-07-10'),
                                                                                        (4, 'golang avanzado', 8, 'programacion', 'curso avanzado del lengueje golang', 4.0, 600, 'alto', ' ', '2024-07-10'),
                                                                                        (5, 'pasteleria con Lucas', 19, 'cocina', 'curso basico y divertido de pasteleria', 3.5, 150, 'bajo', ' ', '2024-08-12'),
                                                                                        (6, 'bossa nova en guitarra', 18, 'musica', 'toca canciones del genero bossa nova en tu guitarra', 2.3, 68, 'intermedio', ' ', '2024-03-10'),
                                                                                        (7, 'maquillaje artistico, brillos y fantasia', 17, 'belleza', 'crea tu propio look con rodolfo y sus esplendidos maquillajes artisticos', 4.8, 72, 'bajo', ' ', '2024-09-09'),
                                                                                        (8, 'coffee coctels', 19, 'cocteleria', 'aprende a preparar distintos coctels usando cafe', 3.9, 70, 'intermedio', ' ', '2024-11-01'),
                                                                                        (9, 'c++ primeros pasos', 8, 'programacion', 'aprende a dar tus primeros pasos la programacion con el mejor profe', 5, 120, 'bajo', ' ', '2024-03-02');


COMMIT;
