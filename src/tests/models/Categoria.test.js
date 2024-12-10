const { DataTypes } = require('sequelize');
const sequelize = require('../configTestDb');
const Comida = require('../../models/Categoria');

beforeAll(async () => {
    await sequelizeTest.sync({ force: true });
});

beforeEach(async () => {
    transaction = await sequelizeTest.transaction();
});

afterEach(async () => {
    await transaction.rollback();
})

afterAll(async () => {
    await sequelizeTest.close();
})

describe('Read Categoria', () => {

    test('Debe devolver una categoria', async () => {
        const categoria = await Categoria.findByPk(1);
        expect(categoria.nombre).toBe('Frutas');
    });

    test('Debe devolver todas las categorias', async () => {
        const categorias = await Categoria.findAll();
        expect(categorias.length).toBe(8);
    });
});