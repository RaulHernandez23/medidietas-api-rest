const Alimento = require("../models/Alimento");

const obtenerAlimentos = async (req, res) => {
  try {
    const alimentos = await Alimento.findAll();
    res.json(alimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerAlimentos,
};
