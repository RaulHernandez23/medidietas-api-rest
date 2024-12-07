const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const ExpertoNutricion = sequelize.define(
    "experto_nutricion",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido_paterno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido_materno: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        educacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        perfilProfesional: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);

module.exports = ExpertoNutricion;