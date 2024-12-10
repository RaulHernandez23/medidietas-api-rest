const { DataTypes } = require('sequelize');
const sequelize = require('../configTestDb');
const Alimento = require('../../models/Objetivo');

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

describe('Create Objetivo', () => {

    test('Debe crear un objetivo', async () => {
        const objetivo = await Objetivo.create({
            calorias: 2000,
            carbohidratos: 200,
            grasas: 100,
            proteinas: 100
        }, { transaction });

        expect(objetivo.nombre).toBe('Perder peso');
    })

    test('Debe lanzar un error si falta un campo requerido', async () => {
        await expect(Objetivo.create({
            calorias: 2000,
            carbohidratos: 200,
            grasas: 100,
        }, { transaction })).rejects.toThrow();
    });
})

describe('Read Objetivo', () => {

    test('Debe devolver un objetivo', async () => {
        const objetivo = await Objetivo.findByPk(1);
        expect(objetivo.id).toBe(1);
    });
});

describe('Update Objetivo', () => {

    test('Debe actualizar un objetivo', async () => {
        const objetivo = await Objetivo.findByPk(1);

        objetivo.calorias = 2500;
        await objetivo.save({ transaction });

        const objetivoActualizado = await Objetivo.findByPk(1, { transaction });

        expect(objetivoActualizado.calorias).toBe(2500);
    });
})

describe('Delete Objetivo', () => {

    test('Debe eliminar un objetivo', async () => {
        const objetivo = await Objetivo.findByPk(1);

        await objetivo.destroy({ transaction });

        const objetivoEliminado = await Objetivo.findByPk(1, { transaction });

        expect(objetivoEliminado).toBeNull();
    });
});