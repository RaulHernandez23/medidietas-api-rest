CREATE DATABASE IF NOT EXISTS `Medidietas_DATA`;
USE `Medidietas_DATA`;

-- Crear la tabla categoria
CREATE TABLE IF NOT EXISTS `categoria` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL
);

-- Crear la tabla alimento
CREATE TABLE IF NOT EXISTS `alimento` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `calorias` INT NOT NULL,
    `carbohidratos` DECIMAL(8, 2) NOT NULL,
    `grasas` DECIMAL(8, 2) NOT NULL,
    `imagen` VARCHAR(255) NOT NULL,
    `proteinas` DECIMAL(8, 2) NOT NULL,
    `tamano_racion` DECIMAL(8, 2) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `marca` VARCHAR(255) NULL,
    `id_categoria` INT NOT NULL,
    `id_unidad_medida` INT NOT NULL
);
ALTER TABLE `alimento` ADD UNIQUE `alimento_nombre_unique`(`nombre`);

-- Crear la tabla unidad_medida
CREATE TABLE IF NOT EXISTS `unidad_medida` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL
);

-- Crear la tabla Comida
CREATE TABLE IF NOT EXISTS `Comida` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `preparacion_video` VARCHAR(255) NOT NULL,
    `receta` TEXT NOT NULL,
    `estado` BOOLEAN NOT NULL
);
ALTER TABLE `Comida` ADD UNIQUE `comida_nombre_unique`(`nombre`);

-- Crear la tabla alimento_comida
CREATE TABLE IF NOT EXISTS `alimento_comida` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cantidad` DECIMAL(8, 2) NOT NULL,
    `id_alimento` INT NOT NULL,
    `id_receta` INT NOT NULL
);

-- Crear la tabla usuario_movil
CREATE TABLE IF NOT EXISTS `usuario_movil` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_usuario` VARCHAR(255) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `apellido_paterno` VARCHAR(255) NOT NULL,
    `apellido_materno` VARCHAR(255) NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `correo` VARCHAR(255) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `foto` VARCHAR(255) NULL,
    `estatura` DECIMAL(8, 2) NOT NULL,
    `peso` DECIMAL(8, 2) NOT NULL,
    `sexo` BOOLEAN NOT NULL,
    `id_objetivo` INT NOT NULL
);
ALTER TABLE `usuario_movil` ADD UNIQUE `usuario_movil_nombre_usuario_unique`(`nombre_usuario`);
ALTER TABLE `usuario_movil` ADD UNIQUE `usuario_movil_correo_unique`(`correo`);

-- Crear la tabla experto_nutricion
CREATE TABLE IF NOT EXISTS `experto_nutricion` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `apellido_paterno` VARCHAR(255) NOT NULL,
    `apellido_materno` VARCHAR(255) NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `correo` VARCHAR(255) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `foto` BINARY(16) NULL,
    `educacion` VARCHAR(255) NOT NULL,
    `perfilProfesional` VARCHAR(255) NOT NULL
);
ALTER TABLE `experto_nutricion` ADD UNIQUE `experto_nutricion_correo_unique`(`correo`);

-- Crear la tabla objetivo
CREATE TABLE IF NOT EXISTS `objetivo` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `calorias` DECIMAL(8, 2) NOT NULL,
    `carbohidratos` DECIMAL(8, 2) NOT NULL,
    `grasas` DECIMAL(8, 2) NOT NULL,
    `proteinas` DECIMAL(8, 2) NOT NULL
);

-- Crear la tabla momento
CREATE TABLE IF NOT EXISTS `momento` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL
);

-- Crear la tabla consumo
CREATE TABLE IF NOT EXISTS `consumo` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fecha` DATE NOT NULL,
    `cantidad` DECIMAL(8, 2) NOT NULL,
    `id_momento` INT NOT NULL,
    `id_alimento` INT NULL,
    `id_comida` INT NULL,
    `id_usuario_movil` INT NOT NULL
);

-- Relaciones entre tablas
ALTER TABLE `alimento_comida` 
    ADD CONSTRAINT `alimento_comida_id_alimento_foreign` FOREIGN KEY(`id_alimento`) REFERENCES `alimento`(`id`),
    ADD CONSTRAINT `alimento_comida_id_receta_foreign` FOREIGN KEY(`id_receta`) REFERENCES `Comida`(`id`);

ALTER TABLE `consumo`
    ADD CONSTRAINT `consumo_id_alimento_foreign` FOREIGN KEY(`id_alimento`) REFERENCES `alimento`(`id`),
    ADD CONSTRAINT `consumo_id_comida_foreign` FOREIGN KEY(`id_comida`) REFERENCES `Comida`(`id`),
    ADD CONSTRAINT `consumo_id_usuario_movil_foreign` FOREIGN KEY(`id_usuario_movil`) REFERENCES `usuario_movil`(`id`),
    ADD CONSTRAINT `consumo_id_momento_foreign` FOREIGN KEY(`id_momento`) REFERENCES `momento`(`id`);

ALTER TABLE `alimento`
    ADD CONSTRAINT `alimento_id_unidad_medida_foreign` FOREIGN KEY(`id_unidad_medida`) REFERENCES `unidad_medida`(`id`),
    ADD CONSTRAINT `alimento_id_categoria_foreign` FOREIGN KEY(`id_categoria`) REFERENCES `categoria`(`id`);

ALTER TABLE `usuario_movil`
    ADD CONSTRAINT `usuario_movil_id_objetivo_foreign` FOREIGN KEY(`id_objetivo`) REFERENCES `objetivo`(`id`);

