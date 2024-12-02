const UsuarioMovil = require("../models/UsuarioMovil");

const crearUsuarioMovil = async (req, res) => {
  try {
    const usuarioMovil = await UsuarioMovil.create(req.body);
    res.status(201).json(usuarioMovil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerUsuariosMovil = async (req, res) => {
  try {
    const usuariosMovil = await UsuarioMovil.findAll();
    res.json(usuariosMovil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarUsuarioMovil = async (req, res) => {
  try {
    const { id } = req.params;
    await UsuarioMovil.update(req.body, { where: { id } });
    res.json({ message: "UsuarioMovil actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarUsuarioMovil = async (req, res) => {
  try {
    const { id } = req.params;
    await UsuarioMovil.destroy({ where: { id } });
    res.json({ message: "UsuarioMovil eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearUsuarioMovil,
  obtenerUsuariosMovil,
  actualizarUsuarioMovil,
  eliminarUsuarioMovil,
};
