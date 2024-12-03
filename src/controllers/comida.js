const Comida = require("../models/Comida");

const obtenerComidas = async (req, res) => {
  try {
    const comidas = await Comida.findAll();
    res.json(comidas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  obtenerComidas,
};
