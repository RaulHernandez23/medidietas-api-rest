const { DataTypes } = require('sequelize');
const sequelize = require('../configTestDb');
const Comida = require('../../models/Comida');

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

describe('Create comida', () => {

    test('Debe crear una comida', async () => {
        const comida = await Comida.create({
            nombre: 'Ensalada de atún',
            preparacion_video: 'https://www.youtube.com/watch?v=atun',
            receta: 'Mezclar atún con verduras',
            estado: true
        }, { transaction });

        expect(comida.nombre).toBe('Ensalada de atún');
    });
    
    test('Debe lanzar un error si falta un campo requerido', async () => {
        await expect(Comida.create({
            preparacion_video: 'https://www.youtube.com/watch?v=atun',
            estado: true
        }, { transaction })).rejects.toThrow();
    });

    test('Debe lanzar un error si el nombre ya existe', async () => {
        await expect(Comida.create({
            nombre: 'Ensalada de manzana',
            preparacion_video: 'https://www.youtube.com/watch?v=atun',
            receta: 'Mezclar atún con verduras',
            estado: true
        }, { transaction })).rejects.toThrow();  
    });
});

describe('Read Comida', () => {

    test('Debe devolver una comida', async () => {
        const comida = await Comida.findOne({
            where: {
                nombre: 'Ensalada de manzana'
            }
        });
        expect(comidaEncontrada.nombre).toBe('Ensalada de manzana');
    });

    test('Debe debolver nulo si no existe la comida', async () => {
        const comida = await Comida.findOne({
            where: {
                nombre: 'Ensalada de pollo'
            }
        });
        expect(comida).toBeNull();
    });
});

describe('Update Comida', () => {

    test('Debe lanzar un error si el alimento ya existe', async () => {
        const comida = await Comida.findOne({
            where: {
                nombre: 'Comida de prueba'
            }
        }, { transaction });

        comida.nombre = 'Ensalada de manzana';

        await expect(comida.save({ transaction })).rejects.toThrow();
    });

    test('Debe actualizar una comida', async () => {
        const comida = await Comida.findOne({
            where: {
                nombre: 'Comida de prueba'
            }
        });

        comida.nombre = 'Ensalada de pollo';
        await comida.save({ transaction });

        const comidaActualizada = await Comida.findOne({
            where: {
                nombre: 'Ensalada de pollo'
            }
        }, { transaction });

        expect(comidaActualizada.nombre).toBe('Ensalada de pollo');
    });
});

describe('Delete Comida', () => {

    test('Debe eliminar una comida', async () => {
        const comida = await Comida.findOne({
            where: {
                nombre: 'Ensalada de manzana'
            }
        });

        await comida.destroy({ transaction });

        const comidaEliminada = await Comida.findOne({
            where: {
                nombre: 'Ensalada de manzana'
            }
        }, { transaction });
    });
});