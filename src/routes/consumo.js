const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");
const {
  registrarConsumo,
  obtenerConsumosDelDiaPorUsuario,
  modificarConsumo,
  eliminarConsumo,
} = require("../controllers/consumo");

const router = express.Router();

router.post("/", [validarJWT], registrarConsumo);
router.get(
  "/:nombre_usuario/:fecha",
  [validarJWT],
  obtenerConsumosDelDiaPorUsuario
);
router.put("/:id", [validarJWT], modificarConsumo);
router.delete("/:id", [validarJWT], eliminarConsumo);

module.exports = router;
