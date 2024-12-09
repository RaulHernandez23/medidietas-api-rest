-- Insertar datos de ejemplo en la tabla unidad_medida
INSERT INTO `unidad_medida` (`nombre`) VALUES
('gramos'),
('mililitros'),
('piezas'),
('taza');

INSERT INTO `categoria` (`nombre`) VALUES
('Frutas'),
('Verduras'),
('Cereales'),
('Leguminosas'),
('Origen animal'),
('Lacteos'),
('Azúcar'),
('Grasas');

-- Insertar datos de ejemplo en la tabla alimento
INSERT INTO `alimento` (`nombre`, `calorias`, `carbohidratos`, `grasas`, `imagen`, `proteinas`, `tamano_racion`, `estado`, `marca`, `id_categoria`,`id_unidad_medida`) VALUES
('Manzana', 61, 14.7, 0.2, 'manzana.jpg', 0.3, 1, 1, 'Marca', 1, 3),
('Naranja', 72, 18, 0.2, 'naranja.jpg', 0.4, 2, 1, 'Marca', 1, 3),
('Leche Lala Light', 96, 11.1, 2.4, 'leche lala light.jpg', 7.50, 1, 1, 'Lala', 6, 4),
('Tortilla', 64, 13.6, 0.5, 'tortilla.jpg', 1.4, 100.00, 1, 'Marca', 3, 4);

-- Insertar datos de ejemplo en la tabla Comida
INSERT INTO `Comida` (`nombre`, `preparacion_video`, `receta`, `estado`) VALUES
('Ensalada de manzana', 'https://www.youtube.com/watch?v=lA54Fs79Gtc&ab_channel=ChefOropeza', 'Bate muy bien la crema con la leche condensada hasta que estén integradas. Añade el resto de los ingredientes y mezcla hasta integrar.
', 1);

-- Insertar datos de ejemplo en la tabla alimento_comida
INSERT INTO `alimento_comida` (`cantidad`, `id_alimento`, `id_receta`) VALUES
(5, 1, 1),
(1, 2, 1);

-- Insertar datos de ejemplo en la tabla momento
INSERT INTO `momento` (`nombre`) VALUES
('Desayuno'),
('Comida'),
('Cena');

-- Insertar datos de ejemplo en la tabla experto_nutricion
INSERT INTO `experto_nutricion` (`nombre`, `apellido_paterno`, `apellido_materno`, `contrasena`, `correo`, `fecha_nacimiento`, `foto`, `educacion`, `perfil_profesional`) VALUES
('Laura', 'Gómez', 'Sánchez', 'contrasena123', 'lgomez@ejemplo.com', '1980-04-10', 'laura20241207061431.jpg', 'Nutrición y Dietética', 'Especialista en nutrición deportiva'),
('Miguel', 'Ruiz', 'Martínez', 'contrasena456', 'mruiz@ejemplo.com', '1975-08-20', 'miguel20241207061030.jpg', 'Ciencias de la Alimentación', 'Experto en dietas vegetarianas'),
('Raul', 'Hernandez', 'Olivares', 'pass', 'raulh230600@gmail.com', '2000-06-23', 'raul20241209050730.jpg', 'Nutrición', 'Experto');

-- Insertar datos de ejemplo en la tabla objetivo
INSERT INTO `objetivo` (`calorias`, `carbohidratos`, `grasas`, `proteinas`) VALUES
(2000.00, 250.00, 70.00, 50.00),
(1800.00, 200.00, 60.00, 60.00),
(2200.00, 300.00, 80.00, 70.00);

-- Insertar datos de ejemplo en la tabla usuario_movil
INSERT INTO `usuario_movil` (`nombre_usuario`, `nombre`, `apellido_paterno`, `apellido_materno`, `contrasena`, `correo`, `fecha_nacimiento`, `foto`, `estatura`, `peso`, `sexo`, `id_objetivo`) VALUES
('skywhite', 'Miguel', 'Morales', 'Cruz', 'Morales300802', 'miguel@gmail.com', '2002-08-30', 'skywhite.png', 180.00, 75.00, 1, 1);

-- Insertar datos de ejemplo en la tabla consumo
INSERT INTO `consumo` (`fecha`, `id_momento`, `id_alimento`, `id_comida`, `id_usuario_movil`, `cantidad`) VALUES
('2024-12-05', 1, 1, NULL, 1, 150.00),
('2024-12-05', 2, NULL, 1, 1, 250.00),
('2024-12-05', 1, 2, NULL, 1, 200.00),
('2024-12-05', 2, NULL, 2, 1, 300.00);