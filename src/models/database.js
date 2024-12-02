const { Sequelize } = require("sequelize");
// Conexión con MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    define: {
      freezeTableName: true, // Evita que sequelize pluralice los nombres de las tablas
      timestamps: false, // Deshabilita createdAt y updatedAt
    },
    dialect: "mysql",
  }
);
module.exports = sequelize;
