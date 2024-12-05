const UsuarioMovil = require("../models/UsuarioMovil");
const Objetivo = require("../models/Objetivo");
const sequelize = require("../models/database");
const { generarJWT } = require("../helpers/generar-jwt");
const { invalidarJWT } = require("../helpers/invalidar-jwt");

const usuarioLogin = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const usuario = await UsuarioMovil.findOne({
      where: { correo, contrasena },
    });
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario y/o contraseña incorrectos",
      });
    } else {
      console.log(`Login correcto.`);

      const token = await generarJWT(usuario.id);

      res.header("x-token", token);
      console.log(`Token enviado en el header: ${token}`);

      res.json({
        msg: "Usuario logueado",
        usuario,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error al loguear usuario",
      error,
    });
  }
};

const crearUsuarioMovil = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    // Verificar si el nombre_usuario ya existe
    const usuarioExistente = await UsuarioMovil.findOne({
      where: { nombre_usuario: req.body.usuarioMovil.nombre_usuario },
      transaction,
    });

    if (usuarioExistente) {
      await transaction.rollback();
      return res.status(400).json({ error: "El nombre de usuario ya existe" });
    }

    // Crear el objetivo primero
    const objetivo = await Objetivo.create(req.body.objetivo, { transaction });

    // Crear el usuario móvil con el id del objetivo creado
    const usuarioMovilData = {
      ...req.body.usuarioMovil,
      id_objetivo: objetivo.id,
    };
    const usuarioMovil = await UsuarioMovil.create(usuarioMovilData, {
      transaction,
    });

    await transaction.commit();
    res.status(201).json(usuarioMovil);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message, details: error.errors });
  }
};

const cerrarSesion = async (req, res) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(400).json({ msg: "No hay token en la petición" });
    }

    invalidarJWT(token);

    res.json({ msg: "Sesión cerrada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al cerrar sesión", error });
  }
};

const obtenerUsuarioPorNombre = async (req, res) => {
  const { nombre_usuario } = req.params;
  try {
    const usuario = await UsuarioMovil.findOne({
      where: { nombre_usuario },
      include: [{ model: Objetivo }],
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editarUsuario = async (req, res) => {
  const { nombre_usuario } = req.params;
  const { usuarioMovil, objetivo } = req.body;
  const transaction = await sequelize.transaction();

  try {
    // Buscar el usuario por su nombre_usuario
    const usuario = await UsuarioMovil.findOne({
      where: { nombre_usuario },
      include: [{ model: Objetivo }],
      transaction,
    });
    if (!usuario) {
      await transaction.rollback();
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el nuevo nombre de usuario ya existe (excluyendo el usuario actual)
    if (
      usuarioMovil.nombre_usuario &&
      usuarioMovil.nombre_usuario !== nombre_usuario
    ) {
      const usuarioExistente = await UsuarioMovil.findOne({
        where: { nombre_usuario: usuarioMovil.nombre_usuario },
        transaction,
      });
      if (usuarioExistente) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ error: "Este nombre de usuario no se encuentra disponible" });
      }
    }

    // Actualizar los datos del usuario
    await usuario.update(usuarioMovil, { transaction });

    // Actualizar los datos del objetivo asociado
    await usuario.objetivo.update(objetivo, { transaction });

    await transaction.commit();
    res.status(200).json(usuario);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  usuarioLogin,
  crearUsuarioMovil,
  cerrarSesion,
  obtenerUsuarioPorNombre,
  editarUsuario,
};
