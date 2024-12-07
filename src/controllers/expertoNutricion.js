const ExpertoNutricion = require("../models/ExpertoNutricion");
const sequelize = require("../models/database");
const { generarJWT } = require("../helpers/generar-jwt");
const { invalidarJWT } = require("../helpers/invalidar-jwt");

const expertoLogin = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const experto = await ExpertoNutricion.findOne({
            where: { correo, contrasena },
        });

        if (!experto) {
            return res.status(401).json({
                msg: "Usuario y/o contraseña incorrectos"
            });
        } else {
            console.log(`Login correcto.`);

            const token = await generarJWT(experto.id);

            res.header("x-token", token);
            console.log(`Token enviado en el header: ${token}`);

            res.json({
                msg: "Usuario logueado",
                experto,
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "Error al loguear usuario",
            error,
        });
    }
};

const cerrarSesion = async (req, res) => {
    try {
        const token = req.header("x-token");

        if (!token) {
            return res.status(400).json({ msg: "No hay token en la petición" });
        }

        invalidarJWT(token);

        res.json({ msg: "Sesión cerrada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al cerrar sesión", error});
    }
};

module.exports = {
    expertoLogin,
    cerrarSesion,
};