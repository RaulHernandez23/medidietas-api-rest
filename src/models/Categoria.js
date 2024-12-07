const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Categoria = sequelize.define(
    "categoria",
    {
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
    },
    {
        timestamps: false, // Deshabilita createdAt y updatedAt
    }
);

module.exports = Categoria;