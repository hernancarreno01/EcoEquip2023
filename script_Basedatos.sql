CREATE TABLE `categorias` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tipo` VARCHAR(255) NOT NULL,
    `capacidad` INT NOT NULL
);

CREATE TABLE `facturacion` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `factura_id` INT NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `numero` INT NOT NULL,
    `fecha` DATETIME NOT NULL,
    `usuario_id` INT NOT NULL
);

CREATE TABLE `ciudad` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_ciudad` VARCHAR(255) NOT NULL
);

CREATE TABLE `roles` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL
);

CREATE TABLE `productos` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `categoria_id` INT UNSIGNED NOT NULL,
    `descripcion` TEXT NULL,
    `modelo` VARCHAR(255) NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `imagen_01` BLOB NOT NULL,
    `imagen_02` BLOB NOT NULL,
    `imagen_03` BLOB NOT NULL,
    `deleted` TIMESTAMP NOT NULL,
    `creado` DATETIME NOT NULL,
    `editado` DATETIME NOT NULL
);

CREATE TABLE `usuarios` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_usuario` VARCHAR(255) NOT NULL,
    `apellido` VARCHAR(255) NOT NULL,
    `nombres` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NOT NULL,
    `ciudad_id` INT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `imagen_perfil` BLOB NOT NULL,
    `telefono` VARCHAR(15) NOT NULL,
    `rol_id` INT UNSIGNED NOT NULL,
    `deleted` TIMESTAMP NOT NULL,
    `creado` DATETIME NOT NULL,
    `editado` DATETIME NOT NULL
);

CREATE TABLE `factura` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `facturacion_id` INT NOT NULL,
    `producto_id` INT NOT NULL,
    `usuario_id` INT NOT NULL
);

ALTER TABLE `factura` ADD CONSTRAINT `factura_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
ALTER TABLE `facturacion` ADD CONSTRAINT `facturacion_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
ALTER TABLE `factura` ADD CONSTRAINT `factura_facturacion_id_foreign` FOREIGN KEY (`facturacion_id`) REFERENCES `facturacion` (`id`);
ALTER TABLE `productos` ADD CONSTRAINT `productos_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudad` (`id`);
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
ALTER TABLE `factura` ADD CONSTRAINT `factura_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
