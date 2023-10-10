CREATE TABLE `categorias` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tipo` VARCHAR(255) NOT NULL,
    `capacidad` INT NOT NULL
);

CREATE TABLE `facturas` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `factura_prod_id` INT UNSIGNED NOT NULL,
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
    `categorias_id` INT UNSIGNED NOT NULL,
    `descripcion` TEXT NULL,
    `modelo` VARCHAR(255) NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `imagen_01` BLOB NOT NULL,
    `imagen_02` BLOB NOT NULL,
    `imagen_03` BLOB NOT NULL,
    `create_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL
);

CREATE TABLE `usuarios` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_usuario` VARCHAR(255) NOT NULL,
    `apellido` VARCHAR(255) NOT NULL,
    `nombres` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NOT NULL,
    `ciudad_id` INT UNSIGNED NOT NULL,
    `contrasenia` VARCHAR(255) NOT NULL,
    `imagen_perfil` BLOB NOT NULL DEFAULT 'usuario_default.png',
    `telefono` VARCHAR(15) NOT NULL,
    `roles_id` INT UNSIGNED NOT NULL,
    `creado_el` TIMESTAMP NULL,
    `editado_el` TIMESTAMP NULL,
    `borrado_el` TIMESTAMP NULL
);

CREATE TABLE `factura_prod` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `facturas_id` INT NOT NULL,
    `productos_id` INT NOT NULL,
    `usuario_id` INT NOT NULL,
    `cantidad` INT NOT NULL,
    `precio` INT NOT NULL
);

ALTER TABLE `factura_prod` ADD CONSTRAINT `factura_prod_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `facturas` ADD CONSTRAINT `facturas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `factura_prod` ADD CONSTRAINT `factura_prod_facturas_id_foreign` FOREIGN KEY (`facturas_id`) REFERENCES `facturas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `productos` ADD CONSTRAINT `productos_categorias_id_foreign` FOREIGN KEY (`categorias_id`) REFERENCES `categorias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_roles_id_foreign` FOREIGN KEY (`roles_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `facturas` ADD CONSTRAINT `facturas_factura_prod_id_foreign` FOREIGN KEY (`factura_prod_id`) REFERENCES `factura_prod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `factura_prod` ADD CONSTRAINT `factura_prod_productos_id_foreign` FOREIGN KEY (`productos_id`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
