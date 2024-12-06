const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");
const {
  registrarConsumo,
  obtenerConsumosDelDiaPorUsuario,
} = require("../controllers/consumo");

const router = express.Router();

router.post("/", [validarJWT], registrarConsumo);
router.get("/:nombre_usuario", [validarJWT], obtenerConsumosDelDiaPorUsuario);

module.exports = router;
