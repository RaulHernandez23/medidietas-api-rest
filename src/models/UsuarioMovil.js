const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const Objetivo = require("./Objetivo");

const UsuarioMovil = sequelize.define(
  "usuario_movil",
  {
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
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
    estatura: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    peso: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);

UsuarioMovil.belongsTo(Objetivo, { foreignKey: "id_objetivo" });
Objetivo.hasMany(UsuarioMovil, { foreignKey: "id_objetivo" });

module.exports = UsuarioMovil;
