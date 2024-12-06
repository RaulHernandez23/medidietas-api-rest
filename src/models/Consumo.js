const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const Alimento = require("./Alimento");
const Comida = require("./Comida");
const UsuarioMovil = require("./UsuarioMovil");
const Momento = require("./Momento");

const Consumo = sequelize.define(
  "consumo",
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    id_momento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Momento,
        key: "id",
      },
    },
    id_alimento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Alimento,
        key: "id",
      },
    },
    id_comida: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Comida,
        key: "id",
      },
    },
    id_usuario_movil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UsuarioMovil,
        key: "id",
      },
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

// Definir las relaciones
Consumo.belongsTo(Alimento, { foreignKey: "id_alimento" });
Consumo.belongsTo(Comida, { foreignKey: "id_comida" });
Consumo.belongsTo(UsuarioMovil, { foreignKey: "id_usuario_movil" });
Consumo.belongsTo(Momento, { foreignKey: "id_momento" });

Alimento.hasMany(Consumo, { foreignKey: "id_alimento" });
Comida.hasMany(Consumo, { foreignKey: "id_comida" });
UsuarioMovil.hasMany(Consumo, { foreignKey: "id_usuario_movil" });
Momento.hasMany(Consumo, { foreignKey: "id_momento" });

module.exports = Consumo;
