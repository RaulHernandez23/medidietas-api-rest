const { Op } = require("sequelize");
const Alimento = require("../models/Alimento");
const sequelize = require("../models/database");

const obtenerAlimentos = async (req, res) => {
  try {
    const alimentos = await Alimento.findAll();
    res.json(alimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerAlimentoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const alimento = await Alimento.findByPk(id);

    if (!alimento) {
      return res.status(404).json({ error: "Alimento no encontrado" });
    }

    res.status(200).json(alimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registrarAlimento = async (req, res) => {
  const {
    nombre,
    calorias,
    carbohidratos,
    grasas,
    imagen,
    proteinas,
    tamano_racion,
    marca,
    id_unidad_medida,
  } = req.body;
  const transaction = await sequelize.transaction();

  try {
    // Verificar si ya existe un alimento con el mismo nombre
    const alimentoExistente = await Alimento.findOne({
      where: { nombre },
      transaction,
    });
    if (alimentoExistente) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Ya existe un alimento con el mismo nombre" });
    }

    // Crear el alimento con estado true por defecto
    const nuevoAlimento = await Alimento.create(
      {
        nombre,
        calorias,
        carbohidratos,
        grasas,
        imagen,
        proteinas,
        tamano_racion,
        marca,
        id_unidad_medida,
        estado: true,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).json({ mensaje: "Alimento registrado correctamente" });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const editarAlimento = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    calorias,
    carbohidratos,
    grasas,
    imagen,
    proteinas,
    tamano_racion,
    marca,
    id_unidad_medida,
  } = req.body;
  const transaction = await sequelize.transaction();

  try {
    // Buscar el alimento por su id
    const alimento = await Alimento.findByPk(id, { transaction });
    if (!alimento) {
      await transaction.rollback();
      return res.status(404).json({ error: "Alimento no encontrado" });
    }

    // Verificar si ya existe un alimento con el mismo nombre (excluyendo el alimento actual)
    const alimentoExistente = await Alimento.findOne({
      where: { nombre, id: { [Op.ne]: id } },
      transaction,
    });
    if (alimentoExistente) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Ya existe un alimento con el mismo nombre" });
    }

    // Actualizar los datos del alimento (excluyendo el estado)
    await alimento.update(
      {
        nombre,
        calorias,
        carbohidratos,
        grasas,
        imagen,
        proteinas,
        tamano_racion,
        marca,
        id_unidad_medida,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).json({ mensaje: "Alimento actualizado correctamente" });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const eliminarAlimento = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  try {
    // Buscar el alimento por su id
    const alimento = await Alimento.findByPk(id, { transaction });
    if (!alimento) {
      await transaction.rollback();
      return res.status(404).json({ error: "Alimento no encontrado" });
    }

    // Actualizar el estado del alimento a false (eliminado)
    await alimento.update({ estado: false }, { transaction });

    await transaction.commit();
    res.status(200).json({ mensaje: "Alimento eliminado correctamente" });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  obtenerAlimentos,
  obtenerAlimentoPorId,
  registrarAlimento,
  editarAlimento,
  eliminarAlimento,
};
