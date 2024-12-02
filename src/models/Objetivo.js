const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Objetivo = sequelize.define(
  "objetivo",
  {
    calorias: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    carbohidratos: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    grasas: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    proteinas: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

module.exports = Objetivo;
