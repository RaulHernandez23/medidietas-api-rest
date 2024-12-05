const { Op } = require("sequelize");
const Comida = require("../models/Comida");
const Alimento = require("../models/Alimento");
const Alimento_Comida = require("../models/Alimento_Comida");
const sequelize = require("../models/database");

const obtenerComidas = async (req, res) => {
  try {
    const comidas = await Comida.findAll();
    res.json(comidas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registrarComida = async (req, res) => {
  const { nombre, preparacion_video, receta, estado, alimentos } = req.body;
  const transaction = await sequelize.transaction();

  try {
    // Verificar si ya existe una comida con el mismo nombre
    const comidaExistente = await Comida.findOne({
      where: { nombre },
      transaction,
    });
    if (comidaExistente) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Ya existe una comida con el mismo nombre" });
    }

    // Verificar si todos los alimentos existen
    const alimentosEncontrados = await Alimento.findAll({
      where: { nombre: alimentos },
      transaction,
    });

    if (alimentosEncontrados.length !== alimentos.length) {
      await transaction.rollback();
      return res.status(400).json({ error: "Uno o más alimentos no existen" });
    }

    // Crear la comida
    const nuevaComida = await Comida.create(
      { nombre, preparacion_video, receta, estado: true },
      { transaction }
    );

    // Asociar los alimentos
    for (const alimento of alimentosEncontrados) {
      await Alimento_Comida.create(
        { id_receta: nuevaComida.id, id_alimento: alimento.id },
        { transaction }
      );
    }

    await transaction.commit();
    res.status(201).json(nuevaComida);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const editarComida = async (req, res) => {
  const { id } = req.params;
  const { nombre, preparacion_video, receta, estado, alimentos } = req.body;
  const transaction = await sequelize.transaction();

  try {
    // Buscar la comida por su id
    const comida = await Comida.findByPk(id, { transaction });
    if (!comida) {
      await transaction.rollback();
      return res.status(404).json({ error: "Comida no encontrada" });
    }

    // Verificar si ya existe una comida con el mismo nombre (excluyendo la comida actual)
    const comidaExistente = await Comida.findOne({
      where: { nombre, id: { [Op.ne]: id } },
      transaction,
    });
    if (comidaExistente) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Ya existe una comida con el mismo nombre" });
    }

    // Verificar si todos los alimentos existen
    const alimentosEncontrados = await Alimento.findAll({
      where: { nombre: alimentos },
      transaction,
    });

    if (alimentosEncontrados.length !== alimentos.length) {
      await transaction.rollback();
      return res.status(400).json({ error: "Uno o más alimentos no existen" });
    }

    // Actualizar los datos de la comida
    await comida.update({ nombre, preparacion_video, receta }, { transaction });

    // Eliminar las asociaciones actuales con los alimentos
    await Alimento_Comida.destroy({
      where: { id_receta: comida.id },
      transaction,
    });

    // Asociar los nuevos alimentos
    for (const alimento of alimentosEncontrados) {
      await Alimento_Comida.create(
        { id_receta: comida.id, id_alimento: alimento.id },
        { transaction }
      );
    }

    await transaction.commit();
    res.status(200).json(comida);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const eliminarComida = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  try {
    // Buscar la comida por su id
    const comida = await Comida.findByPk(id, { transaction });
    if (!comida) {
      await transaction.rollback();
      return res.status(404).json({ error: "Comida no encontrada" });
    }

    // Actualizar el estado de la comida a false (eliminado)
    await comida.update({ estado: false }, { transaction });

    await transaction.commit();
    res.status(200).json({ mensaje: "Comida eliminada correctamente" });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  obtenerComidas,
  registrarComida,
  editarComida,
  eliminarComida,
};
