const { DataTypes } = require('sequelize');
const sequelize = require('../configTestDb');
const Comida = require('../../models/UnidadMedida');

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

describe('Read UnidadMedida', () => {

    test('Debe devolver una unidad de medida', async () => {
        const unidadMedida = await UnidadMedida.findByPk(1);
        expect(unidadMedida.nombre).toBe('Gramos');
    });

    test('Debe devolver todas las unidades de medida', async () => {
        const unidadesMedida = await UnidadMedida.findAll();
        expect(unidadesMedida.length.toBe(3));
    });
});