const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  obtenerAlimentos,
  obtenerAlimentoPorId,
  registrarAlimento,
  editarAlimento,
  eliminarAlimento,
} = require("../controllers/alimento");

const router = express.Router();

router.get("/", [validarJWT], obtenerAlimentos);
router.get("/:id", [validarJWT], obtenerAlimentoPorId);
router.post("/", [validarJWT], registrarAlimento);
router.put("/:id", [validarJWT], editarAlimento);
router.delete("/:id", [validarJWT], eliminarAlimento);

module.exports = router;
