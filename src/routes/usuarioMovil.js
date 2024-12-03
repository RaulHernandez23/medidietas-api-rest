const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  usuarioLogin,
  crearUsuarioMovil,
  cerrarSesion,
  obtenerUsuariosMovil,
  actualizarUsuarioMovil,
  eliminarUsuarioMovil,
} = require("../controllers/usuarioMovil");

const router = express.Router();

router.post("/signup", crearUsuarioMovil);
router.post("/login", usuarioLogin);
router.post("/logout", [validarJWT], cerrarSesion);
router.get("/", [validarJWT], obtenerUsuariosMovil);
router.put("/:id", [validarJWT], actualizarUsuarioMovil);
router.delete("/:id", [validarJWT], eliminarUsuarioMovil);

module.exports = router;
