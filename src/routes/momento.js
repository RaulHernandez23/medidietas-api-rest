const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  obtenerMomentos,
  obtenerMomentoPorId,
} = require("../controllers/momento");

const router = express.Router();

router.get("/", [validarJWT], obtenerMomentos);
router.get("/:id", [validarJWT], obtenerMomentoPorId);

module.exports = router;
