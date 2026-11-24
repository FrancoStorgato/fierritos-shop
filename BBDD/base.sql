SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `fierritos-shop`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE `fierritos-shop`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('auto','moto') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'POPRACE | Golf GTI Mk2', '/img/gti_mk2_pop_race.png', 'auto', 100000.00, 1),
(2, 'POPRACE | Porsche Targa', '/img/porsche_targa_pop_race.png', 'auto', 150000.00, 1),
(3, 'POPRACE | Nissan Stagea', '/img/nissan_stagea_pop_race.png', 'auto', 220000.00, 1),
(4, 'POPRACE | Honda Civic', '/img/honda_civic_poprace.png', 'auto', 250000.00, 1),
(5, 'POPRACE | Toyota Supra', '/img/supra_poprace.png', 'auto', 250000.00, 1),
(6, 'MINIGT | BMW 750il', '/img/minigt_bmw_750il.jpg', 'auto', 150000.00, 1),
(7, 'MINIGT | Ford Falcon', '/img/minigt_ford_falcon_1975.jpg', 'auto', 140000.00, 1),
(8, 'MINIGT | Subaru Impreza 1998', '/img/minigt_subaru_impreza_1998.jpg', 'auto', 250000.00, 1),
(9, 'MINIGT | Mazda MX5', '/img/mazda_mx5_miniGT.JPG', 'auto', 140000.00, 1),
(10, 'MINIGT | Audi Rs6', '/img/rs6_minigt.JPG', 'auto', 250000.00, 1),
(12, 'MOTOSDECOLECCION | Suzuki Hayabusa', '/img/hayabusa1200.png', 'moto', 50000.00, 0),
(13, 'MOTOSDECOLECCION | BMW S1000RR', '/img/s1000rr.png', 'moto', 70000.00, 1),
(14, 'MOTOSDECOLECCION | Yamaha R1', '/img/r1.png', 'moto', 60000.00, 1),
(15, 'MOTOSDECOLECCION | Honda CRF250R', '/img/crf250r.png', 'moto', 30000.00, 1);

CREATE TABLE `product_sales` (
  `product_id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `product_sales` (`product_id`, `sale_id`, `quantity`) VALUES
(1, 1, 1),
(2, 5, 1),
(3, 2, 1),
(4, 2, 1),
(5, 2, 1),
(6, 5, 1),
(7, 4, 1),
(8, 4, 1),
(9, 3, 1),
(10, 3, 1),
(3, 6, 1),
(15, 6, 1),
(14, 6, 1),
(6, 6, 3),
(4, 7, 1),
(8, 8, 1),
(9, 8, 1),
(10, 8, 1),
(5, 8, 1),
(4, 8, 1),
(3, 8, 1),
(15, 8, 1),
(14, 8, 1),
(4, 9, 1),
(3, 9, 1),
(9, 9, 2),
(8, 9, 1);

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `sales` (`id`, `date`, `total_price`, `user_name`) VALUES
(1, '2025-12-03 15:46:37', 100000.00, 'Fran'),
(2, '2025-12-17 18:03:55', 750000.00, 'Martin'),
(3, '2026-06-10 14:03:32', 390000.00, 'Mel'),
(4, '2026-06-11 12:04:51', 390000.00, 'Joano'),
(5, '2026-06-11 12:18:37', 300000.00, 'Joaco'),
(6, '2026-11-23 17:20:58', 790000.00, 'juano'),
(7, '2026-11-23 17:21:33', 250000.00, 'xavi'),
(8, '2026-11-23 17:33:43', 1450000.00, 'cacho'),
(9, '2026-11-23 22:59:26', 1000000.00, 'martin');

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Admin Fierritos', 'admin@fierritos.com', '$2b$10$ZjR2KwlmmAxt2stjb3hW..pPHZJqIGq6LX3iVng1UbETeQxXHKtk6'),
(2, 'martin', 'martin@admin.com', '$2b$10$2KF/mXwGVQu7E1KN6ag0Pu4nVQj65J4tlx.ypJlW7/62pSEgr5OBW');

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `product_sales`
  ADD KEY `product_id` (`product_id`,`sale_id`),
  ADD KEY `sale_id` (`sale_id`);

ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

