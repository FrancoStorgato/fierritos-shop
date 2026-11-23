-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-06-2026 a las 11:07:32
-- Versión del servidor: 8.0.46-0ubuntu0.22.04.3
-- Versión de PHP: 8.1.2-1ubuntu2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fierritos-shop`
--

-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `fierritos-shop`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE `fierritos-shop`;

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('MINIGT','POPRACE') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES

(1, 'POPRACE | Golf GTI Mk2', '/img/gti_mk2_pop_race.png', 'auto', '100000.00', 1),
(2, 'POPRACE | Porsche Targa', '/img/porsche_targa_pop_race.png', 'auto', '150000.00', 1),
(3, 'POPRACE | Nissan Stagea', '/img/nissan_stagea_pop_race.png', 'auto', '250000.00', 1),
(4, 'POPRACE | Honda Civic', '/img/honda_civic_poprace.png', 'auto', '250000.00', 1),
(5, 'POPRACE | Toyota Supra', '/img/supra_poprace.png', 'auto', '250000.00', 1),
(6, 'MINIGT | BMW 750il', '/img/minigt_bmw_750il.jpg', 'auto', '150000.00', 1),
(7, 'MINIGT | Ford Falcon', '/img/minigt_ford_falcon_1975.jpg', 'auto', '140000.00', 1),
(8, 'MINIGT | Subaru Impreza 1998', '/img/minigt_subaru_impreza_1998.jpg', 'auto', '250000.00', 1),
(9, 'MINIGT | Mazda MX5', '/img/mazda_mx5_miniGT.JPG', 'auto', '140000.00', 1),
(10, 'MINIGT | Audi Rs6', '/img/rs6_minigt.JPG', 'auto', '250000.00', 1),
(12, 'MOTOSDECOLECCION | Suzuki Hayabusa', '/img/hayabusa.png', 'moto', '50000.00', 1),
(13, 'MOTOSDECOLECCION | BMW S1000RR', '/img/s1000rr.png', 'moto', '70000.00', 1),
(14, 'MOTOSDECOLECCION | Yamaha R1', '/img/r1.png', 'moto', '60000.00', 1),
(15, 'MOTOSDECOLECCION | Honda CRF250R', '/img/crf250r.png', 'moto', '30000.00', 1);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sales`
--

CREATE TABLE `product_sales` (
  `product_id` int NOT NULL,
  `sale_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_sales`
--

INSERT INTO `product_sales` (`product_id`, `sale_id`) VALUES
(1, 1),
(2, 5),
(3, 2),
(4, 2),
(5, 2),
(6, 5),
(7, 4),
(8, 4),
(9, 3),
(10, 3);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `date`, `total_price`, `user_name`) VALUES
(1, '2025-12-03 15:46:37', '100000.00', 'Fran'),
(2, '2025-12-17 18:03:55', '750000.00', 'Martin'),
(3, '2026-06-10 14:03:32', '390000.00', 'Mel'),
(4, '2026-06-11 12:04:51', '390000.00', 'Joano'),
(5, '2026-06-11 12:18:37', '300000.00', 'Joaco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Lucas Gomez', 'lucas.gomez@gmail.com', 'lucas123'),
(2, 'Sofia Martinez', 'sofia.m@hotmail.com', 'sofia456'),
(3, 'Mateo Fernandez', 'mateo.f@outlook.com', 'mateo789'),
(4, 'Valentina Ruiz', 'valen.ruiz@gmail.com', 'valen2026'),
(5, 'Martin Silva', 'martin.silva@hotmail.com', 'silvaPass'),
(6, 'Camila Torres', 'camila.t@outlook.com', 'cami1234'),
(7, 'Nicolas Romero', 'nico.romero@gmail.com', 'nicoPass'),
(8, 'Lucia Morales', 'lucia.m@hotmail.com', 'lucia999'),
(9, 'Joaquin Diaz', 'joaco.diaz@outlook.com', 'joaco321'),
(10, 'usuario_dev', 'dev@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
(11, 'admin_test', 'admin@hotmail.com', '$2b$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm'),
(12, 'Florencia Castro', 'flor.castro@outlook.com', 'florPass'),
(13, 'Diego Alvarez', 'diego.a@gmail.com', 'diego555'),
(14, 'Agustina Vega', 'agus.vega@hotmail.com', '$2b$10$eImiTXuWVxfM37uY4JANjQ==');



--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD KEY `product_id` (`product_id`,`sale_id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;