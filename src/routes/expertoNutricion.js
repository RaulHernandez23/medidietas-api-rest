const express = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
    expertoLogin,
    cerrarSesion,
} = require("../controllers/expertoNutricion");

const router = express.Router();

router.post("/login", expertoLogin);
router.post("/logout", [validarJWT], cerrarSesion);

module.exports = router;