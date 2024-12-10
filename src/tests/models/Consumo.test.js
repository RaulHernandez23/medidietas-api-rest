const { DataTypes } = require('sequelize');
const sequelizeTest = require('../configTestDb');
const Consumo = require('../../models/Consumo');

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

describe('Create Consumo', () => {

    test('Debe crear un consumo', async () => {
        const consumo = await Consumo.create({
            fecha: '2021-10-10',
            cantidad: 100,
            id_momento: 1,
            id_alimento: 1,
            id_comida: null,
            id_usuario_movil: 1
        }, { transaction });

        expect(consumo.fecha).toStrictEqual(new Date('2021-10-10T00:00:00.000Z'));
    });

    test('Debe lanzar un error si falta un campo requerido', async () => {
        await expect(Consumo.create({
            cantidad: 100,
            id_momento: 1,
            id_alimento: 1,
            id_comida: null,
        }, { transaction })).rejects.toThrow();
    }); 
});

describe('Read Consumo', () => {

    test('Debe devolver un consumo', async () => {
        const consumo = await Consumo.findByPk(1);
        expect(consumo.fecha).toBe('2024-12-05');
    });
});

describe('Update Consumo', () => {
    
    test('Debe actualizar un consumo', async () => {
        const consumo = await Consumo.findByPk(1);
        consumo.fecha = '2024-12-05';
        await consumo.save({ transaction });
        const consumoActualizado = await Consumo.findByPk(1, { transaction });
        expect(consumoActualizado.fecha).toBe('2024-12-05');
    });
});

describe('Delete Consumo', () => {

    test('Debe eliminar un consumo', async () => {
        const consumo = await Consumo.findByPk(1);
        await consumo.destroy({ transaction });
        const consumoEliminado = await Consumo.findByPk(1, { transaction });
        expect(consumoEliminado).toBeNull();
    });
});