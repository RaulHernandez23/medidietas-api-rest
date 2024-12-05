const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  usuarioLogin,
  crearUsuarioMovil,
  cerrarSesion,
  obtenerUsuarioPorNombre,
  editarUsuario,
} = require("../controllers/usuarioMovil");

const router = express.Router();

router.post("/signup", crearUsuarioMovil);
router.post("/login", usuarioLogin);
router.post("/logout", [validarJWT], cerrarSesion);
router.get("/:nombre_usuario", [validarJWT], obtenerUsuarioPorNombre);
router.put("/:nombre_usuario", [validarJWT], editarUsuario);

module.exports = router;
