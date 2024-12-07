const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const UnidadMedida = require("./UnidadMedida");
const Categoria = require("./Categoria");

const Alimento = sequelize.define(
  "alimento",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    calorias: {
      type: DataTypes.INTEGER,
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
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proteinas: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    tamano_racion: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: "id",
      },
    },
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UnidadMedida,
        key: "id",
      },
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

Alimento.belongsTo(UnidadMedida, { foreignKey: "id_unidad_medida" });
UnidadMedida.hasMany(Alimento, { foreignKey: "id_unidad_medida" });

Alimento.belongsTo(Categoria, { foreignKey: "id_categoria" });
Categoria.hasMany(Alimento, { foreignKey: "id_categoria" });

module.exports = Alimento;
