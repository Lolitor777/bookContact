-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.2.0 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bookcontact
DROP DATABASE IF EXISTS `bookcontact`;
CREATE DATABASE IF NOT EXISTS `bookcontact` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bookcontact`;

-- Volcando estructura para tabla bookcontact.tb_contacts
DROP TABLE IF EXISTS `tb_contacts`;
CREATE TABLE IF NOT EXISTS `tb_contacts` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `last_name` varchar(40) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `email` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `phone_number` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL,
  `address` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT (1),
  `user_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  KEY `FK_tb_contacts_tb_users` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla bookcontact.tb_contacts: 3 rows
/*!40000 ALTER TABLE `tb_contacts` DISABLE KEYS */;
INSERT IGNORE INTO `tb_contacts` (`contact_id`, `name`, `last_name`, `email`, `phone_number`, `address`, `is_active`, `user_id`, `createdAt`, `updatedAt`) VALUES
	(1, 'victor', NULL, 'asdfasdf', '123123', 'asdfasdf', 0, 4, '2024-09-04 15:42:35', '2024-09-05 15:07:38'),
	(2, 'Diego', 'Pradera', 'Diego@g.com', '123212', 'adsfasdf', 1, 4, '2024-09-04 15:42:51', '2024-09-05 18:21:57'),
	(4, 'Juan', 'Porras', 'asdf', 'asdf', 'asdf', 1, 4, '2024-09-04 15:43:10', '2024-09-05 19:11:06');
/*!40000 ALTER TABLE `tb_contacts` ENABLE KEYS */;

-- Volcando estructura para tabla bookcontact.tb_users
DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE IF NOT EXISTS `tb_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(70) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla bookcontact.tb_users: 2 rows
/*!40000 ALTER TABLE `tb_users` DISABLE KEYS */;
INSERT IGNORE INTO `tb_users` (`user_id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
	(4, 'Diego', 'Diego@g.com', '$2a$10$traVDDtS6kZAaKZ8WIBAYeG5dUBK6gsdhT5AVbkFDM3Sc/XEsCZYq', '2024-09-04 17:46:22', '2024-09-04 17:46:22'),
	(8, 'victor', 'victor@g.com', '$2a$10$jmWALaqKkIbr58YNlDCJweYQplnL.8G0ocyA3prG5KqbZ2..o7GGy', '2024-09-05 18:19:49', '2024-09-05 18:19:49');
/*!40000 ALTER TABLE `tb_users` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
