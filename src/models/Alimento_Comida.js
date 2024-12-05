const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const Comida = require("./Comida");
const Alimento = require("./Alimento");

const ComidaAlimento = sequelize.define(
  "alimento_comida",
  {
    id_alimento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Alimento,
        key: "id",
      },
    },
    id_receta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Comida,
        key: "id",
      },
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

Comida.belongsToMany(Alimento, {
  through: ComidaAlimento,
  foreignKey: "id_receta",
});
Alimento.belongsToMany(Comida, {
  through: ComidaAlimento,
  foreignKey: "id_alimento",
});

module.exports = ComidaAlimento;
