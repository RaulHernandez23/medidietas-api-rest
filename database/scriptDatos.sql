-- Insertar datos de ejemplo en la tabla unidad_medida
INSERT INTO `unidad_medida` (`nombre`) VALUES
('gramos'),
('mililitros'),
('piezas');

-- Insertar datos de ejemplo en la tabla alimento
INSERT INTO `alimento` (`nombre`, `calorias`, `carbohidratos`, `grasas`, `imagen`, `proteinas`, `tamano_racion`, `estado`, `marca`, `id_unidad_medida`) VALUES
('Manzana', 52, 14.00, 0.17, 'manzana.jpg', 0.26, 100.00, 1, 'Marca A', 1),
('Leche', 42, 4.80, 1.00, 'leche.jpg', 3.40, 100.00, 1, 'Marca B', 2),
('Pan Integral', 265, 49.00, 3.20, 'pan_integral.jpg', 9.00, 100.00, 1, 'Marca C', 1);

-- Insertar datos de ejemplo en la tabla Comida
INSERT INTO `Comida` (`nombre`, `preparacion_video`, `receta`, `estado`) VALUES
('Ensalada de Frutas', 'ensalada_frutas.mp4', 'Mezclar frutas frescas y servir.', 1),
('Batido de Proteínas', 'batido_proteinas.mp4', 'Mezclar leche, plátano y proteína en polvo.', 1);

-- Insertar datos de ejemplo en la tabla alimento_comida
INSERT INTO `alimento_comida` (`id_alimento`, `id_receta`) VALUES
(1, 1),
(2, 2);

-- Insertar datos de ejemplo en la tabla experto_nutricion
INSERT INTO `experto_nutricion` (`nombre`, `apellido_paterno`, `apellido_materno`, `contrasena`, `correo`, `fecha_nacimiento`, `foto`, `educacion`, `perfilProfesional`) VALUES
('Laura', 'Gómez', 'Sánchez', 'contrasena123', 'lgomez@ejemplo.com', '1980-04-10', NULL, 'Nutrición y Dietética', 'Especialista en nutrición deportiva'),
('Miguel', 'Ruiz', 'Martínez', 'contrasena456', 'mruiz@ejemplo.com', '1975-08-20', NULL, 'Ciencias de la Alimentación', 'Experto en dietas vegetarianas');

-- Insertar datos de ejemplo en la tabla objetivo
INSERT INTO `objetivo` (`calorias`, `carbohidratos`, `grasas`, `proteinas`) VALUES
(2000.00, 250.00, 70.00, 50.00),
(1800.00, 200.00, 60.00, 60.00),
(2200.00, 300.00, 80.00, 70.00);

-- Insertar datos de ejemplo en la tabla consumo
INSERT INTO `consumo` (`fecha`, `id_momento`, `id_alimento`, `id_comida`, `id_usuario_movil`) VALUES
('2023-10-01', 1, 1, NULL, 1),
('2023-10-01', 2, NULL, 1, 2),
('2023-10-02', 1, 2, NULL, 3),
('2023-10-02', 2, NULL, 2, 4);

-- Insertar datos de ejemplo en la tabla usuario_movil
INSERT INTO `usuario_movil` (`nombre_usuario`, `nombre`, `apellido_paterno`, `apellido_materno`, `contrasena`, `correo`, `fecha_nacimiento`, `foto`, `estatura`, `peso`, `sexo`, `id_objetivo`) VALUES
('jgarcia', 'Juan', 'García', 'Pérez', 'contrasena123', 'jgarcia@ejemplo.com', '1990-01-01', NULL, 180.00, 75.00, 1, 1),
('amartinez', 'Ana', 'Martínez', 'López', 'contrasena456', 'amartinez@ejemplo.com', '1985-05-15', NULL, 165.00, 60.00, 0, 2),
('bfernandez', 'Beatriz', 'Fernández', NULL, 'contrasena789', 'bfernandez@ejemplo.com', '1992-07-20', NULL, 175.00, 80.00, 0, 3),
('cjimenez', 'Carlos', 'Jiménez', 'Rodríguez', 'contrasena321', 'cjimenez@ejemplo.com', '1988-03-10', NULL, 160.00, 55.00, 1, 1),
('dlopez', 'Daniel', 'López', 'González', 'contrasena654', 'dlopez@ejemplo.com', '1995-12-25', NULL, 170.00, 70.00, 1, 2);