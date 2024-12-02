const express = require("express");
const {
  crearUsuarioMovil,
  obtenerUsuariosMovil,
  actualizarUsuarioMovil,
  eliminarUsuarioMovil,
} = require("../controllers/usuarioMovil");

const router = express.Router();

router.post("/", crearUsuarioMovil);
router.get("/", obtenerUsuariosMovil);
router.put("/:id", actualizarUsuarioMovil);
router.delete("/:id", eliminarUsuarioMovil);

module.exports = router;
