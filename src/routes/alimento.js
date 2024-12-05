const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  obtenerAlimentos,
  registrarAlimento,
  editarAlimento,
} = require("../controllers/alimento");

const router = express.Router();

router.get("/", [validarJWT], obtenerAlimentos);
router.post("/", [validarJWT], registrarAlimento);
router.put("/:id", [validarJWT], editarAlimento);

module.exports = router;
