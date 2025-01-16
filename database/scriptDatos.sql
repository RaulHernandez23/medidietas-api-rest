-- Insertar datos de ejemplo en la tabla unidad_medida
INSERT INTO `unidad_medida` (`nombre`) VALUES
('gramo'),
('mililitro'),
('pieza'),
('taza'),
('cucharada');

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
('Tortilla', 64, 13.6, 0.5, 'tortilla.jpg', 1.4, 100.00, 1, 'Marca', 3, 3),
('Pera', 57, 15.2, 0.1, 'pera.jpg', 0.5, 1, 1, 'Marca', 1, 3),
('Plátano', 89, 22.8, 0.3, 'platano.jpg', 1.1, 1, 1, 'Marca', 1, 3),
('Papa', 77, 17.5, 0.1, 'papa.jpg', 2, 1, 1, 'Marca', 3, 3),
('Frijol', 333, 63, 1.2, 'frijol.jpg', 21, 1, 1, 'Marca', 4, 4),
('Huevo', 155, 1.1, 11, 'huevo.jpg', 13, 1, 1, 'Marca', 5, 3),
('Leche', 42, 5, 2, 'leche.jpg', 3, 1, 1, 'Marca', 6, 4),
('Aceite', 884, 0, 100, 'aceite.jpg', 0, 1, 1, 'Marca', 8, 5),
('Pollo', 165, 0, 9, 'pollo.jpg', 20, 1, 1, 'Marca', 5, 3),
('Carne', 250, 0, 20, 'carne.jpg', 26, 1, 1, 'Marca', 5, 1),
('Pescado', 206, 0, 13, 'pescado.jpg', 20, 1, 1, 'Marca', 5, 3),
('Queso', 402, 1.3, 33, 'queso.jpg', 25, 1, 1, 'Marca', 6, 1),
('Yogurt', 59, 4.7, 3.3, 'yogurt.jpg', 3.5, 0.5, 1, 'Marca', 6, 4),
('Mantequilla', 717, 0, 81, 'mantequilla.jpg', 0.9, 1, 1, 'Marca', 8, 5),
('Fresas', 32, 7.7, 0.3, 'fresas.jpg', 0.7, 1, 1, 'Marca', 4, 1);	

-- Insertar datos de ejemplo en la tabla comida
INSERT INTO `comida` (`nombre`, `preparacion_video`, `receta`, `estado`) VALUES
('Ensalada de frutas', 'https://www.youtube.com/watch?v=yI1y6PDBCak&ab_channel=Q%27Ricorecetas','Coloque la fruta en un tazón de mezclar grande y mézclela con jugo de piña. Déjela reposar por 15 minutos a temperatura ambiente. Coloque 1 taza de ensalada de fruta en un tazón pequeño y cúbralo con ½ taza de yogur. Espolvoree las almendras sobre cada una de las ensaladas de fruta. Sirva de inmediato.', 1);

-- Insertar datos de ejemplo en la tabla alimento_comida
INSERT INTO `alimento_comida` (`cantidad`, `id_alimento`, `id_receta`) VALUES
(1, 1, 1),
(1, 15, 1),
(1, 17, 1);

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
(2800.00, 350.00, 78.00, 175.00),
(3500.00, 480.00, 97.00, 175.00);

-- Insertar datos de ejemplo en la tabla usuario_movil
INSERT INTO `usuario_movil` (`nombre_usuario`, `nombre`, `apellido_paterno`, `apellido_materno`, `contrasena`, `correo`, `fecha_nacimiento`, `foto`, `estatura`, `peso`, `sexo`, `id_objetivo`) VALUES
('skywhite', 'Miguel', 'Morales', 'Cruz', 'Morales300802', 'miguel@gmail.com', '2002-08-30', 'skywhite.png', 180.00, 75.00, 1, 1),
('rulo23', 'Raúl', 'Hernández', 'Olivares', 'pass', 'raul@gmail.com', '2000-06-23', 'rulo23.jpg', 170.00, 75.00, 1, 2);

-- Insertar datos de ejemplo en la tabla consumo
INSERT INTO `consumo` (`fecha`, `id_momento`, `id_alimento`, `id_comida`, `id_usuario_movil`, `cantidad`) VALUES
('2025-01-17', 1, 1, NULL, 1, 2.00),
('2025-01-17', 2, 2, NULL, 1, 1.00),
('2025-01-17', 1, 3, NULL, 1, 4.00),
('2025-01-17', 2, 4, NULL, 1, 1.00),
('2025-01-17', 3, 15, NULL, 1, 2.00);