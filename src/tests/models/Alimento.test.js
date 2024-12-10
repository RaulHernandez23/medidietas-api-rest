const { DataTypes } = require('sequelize');
const sequelizeTest = require('../configTestDb');
const Alimento = require('../../models/Alimento');

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

describe('Create Alimento', () => {

    test('Debe crear un alimento', async () => {
        const alimento = await Alimento.create({
            nombre: 'Sandía',
            calorias: 30,
            carbohidratos: 7.6,
            grasas: 0.2,
            imagen: 'sandia.jpg',
            proteinas: 0.6,
            tamano_racion: 100,
            estado: true,
            marca: 'La Sandía',
            id_categoria: 1,
            id_unidad_medida: 1
        }, { transaction });

        expect(alimento.nombre).toBe('Sandía');
    })

    test('Debe lanzar un error si falta un campo requerido', async () => {
        await expect(Alimento.create({
            calorias: 30,
            carbohidratos: 7.6,
            grasas: 0.2,
            imagen: 'sandia.jpg',
            proteinas: 0.6,
            tamano_racion: 100,
            estado: true,
            marca: 'La Sandía',
            id_categoria: 1,
        }, { transaction })).rejects.toThrow();
    });

    test('Debe lanzar un error si el nombre ya existe', async () => {
        await expect(Alimento.create({
            nombre: 'Manzana',
            calorias: 30,
            carbohidratos: 7.6,
            grasas: 0.2,
            imagen: 'sandia.jpg',
            proteinas: 0.6,
            tamano_racion: 100,
            estado: true,
            marca: 'La Sandía',
            id_categoria: 1,
            id_unidad_medida: 1
        }, { transaction })).rejects.toThrow();
    })
})

describe('Read Alimento', () => {

    test('Debe devolver un alimento', async () => {
        const alimento = await Alimento.findOne({
            where: {
                nombre: 'Manzana'
            }
        });
        expect(alimento.nombre).toBe('Manzana');
    });

    test('Deve devolver nulo con un alimento que no existe', async () => {
        const alimento = await Alimento.findOne({
            where: {
                nombre: 'Pozole'
            }
        });
        expect(alimento).toBeNull();
    });
});

describe('Update Alimento', () => {
    test('Debe lanzar un error si el alimento ya existe', async () => {
        const alimento = await Alimento.findOne({
            where: {
                nombre: 'Naranja'
            }
        });

        alimento.nombre = 'Manzana';

        await expect(alimento.save({ transaction })).rejects.toThrow();
    })

    test('Debe actualizar un alimento', async () => {
        const alimento = await Alimento.findByPk(1);

        alimento.calorias = 2500;
        await alimento.save({ transaction });

        const alimentoActualizado = await Alimento.findByPk(1, { transaction });

        expect(alimentoActualizado.calorias).toBe(2500);
    });
});

describe('Delete Alimento', () => {
    test('Debe eliminar un alimento', async () => {
        const alimento = await Alimento.findByPk(4);
        await alimento.destroy({ transaction, force: true });
        const alimentoEliminado = await Alimento.findByPk(4, { transaction });
        expect(alimentoEliminado).toBeNull();
    });
});

