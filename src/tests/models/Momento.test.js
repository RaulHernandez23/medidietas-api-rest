const { DataTypes } = require('sequelize');
const sequelizeTest = require('../configTestDb');
const Momento = require('../../models/Momento');

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

describe('Read Momento', () => {

    test('Debe devolver un momento', async () => {
        const momento = await Momento.findByPk(1);
        expect(momento.nombre).toBe('Desayuno');
    });

    test('Debe devolver todos los momentos', async () => {
        const momentos = await Momento.findAll();
        expect(momentos.length).toBe(3);
    });
});