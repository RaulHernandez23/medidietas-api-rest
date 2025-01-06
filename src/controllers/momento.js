const Momento = require("../models/Momento");

const obtenerMomentos = async (req, res) => {
  try {
    const momentos = await Momento.findAll();
    res.json(momentos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerMomentoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const momento = await Momento.findByPk(id);

    if (!momento) {
      return res.status(404).json({ error: "Momento no encontrado" });
    }

    res.json(momento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  obtenerMomentos,
  obtenerMomentoPorId,
};
