const { DataTypes } = require('sequelize');
const sequelizeTest = require('../configTestDb');
const UnidadMedida = require('../../models/UnidadMedida');

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
        expect(unidadMedida.nombre).toBe('gramos');
    });

    test('Debe devolver todas las unidades de medida', async () => {
        const unidadesMedida = await UnidadMedida.findAll();
        expect(unidadesMedida.length).toBe(4);
    });
});