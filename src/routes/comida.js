const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const { obtenerComidas } = require("../controllers/comida");

const router = express.Router();

router.get("/", [validarJWT], obtenerComidas);

module.exports = router;
