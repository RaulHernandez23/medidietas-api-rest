const { DataTypes } = require('sequelize');
const sequelizeTest = require('../configTestDb');
const ExpertoNutricion = require('../../models/ExpertoNutricion');

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

describe('Create Experto', () => {
    test('Debe crear un experto en nutrición', async () => {
        const experto = await ExpertoNutricion.create({
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            apellido_materno: 'Gomez',
            contrasena: 'juan123',
            correo: 'juan@gmail.com',
            fecha_nacimiento: '1990-01-01',
            foto: 'juan.jpg',
            educacion: 'Licenciatura en Nutrición',
            perfil_profesional: 'Nutriólogo con 5 años de experiencia'
        }, { transaction });

        expect(experto.correo).toBe('juan@gmail.com');
    });

    test('Debe lanzar un error si falta un campo requerido', async () => {
        await expect(ExpertoNutricion.create({
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            contrasena: 'juan123',
            correo: '',
        }, { transaction })).rejects.toThrow();
    });

    test('Debe lanzar un error si el correo ya existe', async () => {
        await expect(ExpertoNutricion.create({
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            apellido_materno: 'Gomez',
            contrasena: 'juan123',
            correo: 'raulh230600@gmail.com',
            fecha_nacimiento: '1990-01-01',
            foto: 'juan.jpg',
            educacion: 'Licenciatura en Nutrición',
            perfil_profesional: 'Nutriólogo con 5 años de experiencia'
        }, { transaction })).rejects.toThrow();  
    })
});

describe('Read Experto', () => {

    test('Debe devolver un experto en nutrición', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'raulh230600@gmail.com'
            }
        });
        expect(experto.correo).toBe('raulh230600@gmail.com');
    });

    test('Debe devolver nulo con un experto que no existe', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'correoPrueba@Prueba.com'
            }
        });
        expect(experto).toBeNull();
    });
});

describe('Update Experto', () => {

    test('Debe lanzar un error si el correo ya existe', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'mruiz@ejemplo.com'
            }
        });

        experto.correo = 'raulh230600@gmail.com';

        await expect(experto.save({ transaction })).rejects.toThrow();
    });

    test('Debe actualizar un experto en nutrición', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'lgomez@ejemplo.com'
            }
        });
        experto.correo = 'laura@ejemplo.com';
        await experto.save({ transaction });

        const expertoActualizado = await ExpertoNutricion.findOne({
            where: {
                correo: 'laura@ejemplo.com'
            }, 
        }, { transaction });
        expect(expertoActualizado.correo).toBe('laura@ejemplo.com');
    });
});

describe('Delete Experto', () => {

    test('Debe eliminar un experto en nutrición', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'raulh230600@gmail.com'
            }
        });
        await experto.destroy({ transaction });

        const expertoEliminado = await ExpertoNutricion.findOne({
            where: {
                correo: 'raulh230600@gmail.com'
            }
        }, { transaction });

        expect(expertoEliminado).toBeNull();
    });
});
