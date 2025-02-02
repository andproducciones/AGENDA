/*
 Navicat Premium Data Transfer

 Source Server         : www.ioasystem.com
 Source Server Type    : MySQL
 Source Server Version : 80040
 Source Host           : www.ioasystem.com:3306
 Source Schema         : ioasyste_agenda

 Target Server Type    : MySQL
 Target Server Version : 80040
 File Encoding         : 65001

 Date: 30/01/2025 23:47:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contacto
-- ----------------------------
DROP TABLE IF EXISTS `contacto`;
CREATE TABLE `contacto`  (
  `cod_contacto` int NOT NULL AUTO_INCREMENT,
  `nom_contacto` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ape_contacto` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono_contacto` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email_contacto` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `persona_cod_persona` int NOT NULL,
  PRIMARY KEY (`cod_contacto`) USING BTREE,
  INDEX `fk_contacto_persona_idx`(`persona_cod_persona`) USING BTREE,
  CONSTRAINT `fk_contacto_persona` FOREIGN KEY (`persona_cod_persona`) REFERENCES `persona` (`cod_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for persona
-- ----------------------------
DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona`  (
  `cod_persona` int NOT NULL AUTO_INCREMENT,
  `ci_persona` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nom_persona` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ape_persona` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clave_persona` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `correo_persona` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`cod_persona`) USING BTREE,
  UNIQUE INDEX `ci_persona_UNIQUE`(`ci_persona`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 66 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
