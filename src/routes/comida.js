const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  obtenerComidas,
  obtenerComidaPorId,
  registrarComida,
  editarComida,
  eliminarComida,
} = require("../controllers/comida");

const router = express.Router();

router.get("/", [validarJWT], obtenerComidas);
router.get("/:id", [validarJWT], obtenerComidaPorId);
router.post("/", [validarJWT], registrarComida);
router.put("/:id", [validarJWT], editarComida);
router.delete("/:id", [validarJWT], eliminarComida);

module.exports = router;
