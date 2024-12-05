const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const { obtenerAlimentos } = require("../controllers/alimento");

const router = express.Router();

router.get("/", [validarJWT], obtenerAlimentos);

module.exports = router;
