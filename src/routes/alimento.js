const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  obtenerAlimentos,
  obtenerAlimentoPorId,
  registrarAlimento,
  editarAlimento,
  eliminarAlimento,
  obtenerUnidadesMedida,
} = require("../controllers/alimento");

const router = express.Router();

router.get("/unidades-medida", obtenerUnidadesMedida);
router.get("/", [validarJWT], obtenerAlimentos);
router.get("/:id", [validarJWT], obtenerAlimentoPorId);
router.post("/", [validarJWT], registrarAlimento);
router.put("/:id", [validarJWT], editarAlimento);
router.delete("/:id", [validarJWT], eliminarAlimento);

module.exports = router;
