const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Momento = sequelize.define(
  "momento",
  {
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

module.exports = Momento;
