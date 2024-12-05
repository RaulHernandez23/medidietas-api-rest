const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const UnidadMedida = sequelize.define(
  "unidad_medida",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

module.exports = UnidadMedida;
