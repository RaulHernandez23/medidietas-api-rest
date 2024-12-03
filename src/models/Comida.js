const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Comida = sequelize.define(
  "comida",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    preparacion_video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

module.exports = Comida;
