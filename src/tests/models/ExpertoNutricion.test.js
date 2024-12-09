const { DataTypes } = require('sequelize');
const sequelizeTest = require('../configTestDb');
const ExpertoNutricion = require('../../models/ExpertoNutricion');

beforeAll(async () => {
    await sequelizeTest.sync({ force: true });
});

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
        });

        expect(experto.correo).toBe('juan@gmail.com');
    });

    test('Debe lanzar un error si falta un campo requerido', async () => {
        await expect(ExpertoNutricion.create({
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            contrasena: 'juan123',
            correo: '',
        })).rejects.toThrow();
    });

    test('Debe lanzar un error si el correo ya existe', async () => {
        await expect(ExpertoNutricion.create({
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            apellido_materno: 'Gomez',
            contrasena: 'juan123',
            correo: 'juan@gmail.com',
            fecha_nacimiento: '1990-01-01',
            foto: 'juan.jpg',
            educacion: 'Licenciatura en Nutrición',
            perfil_profesional: 'Nutriólogo con 5 años de experiencia'
    })).rejects.toThrow();
        
    })

    
});

describe ('Read Experto', () => {

    test('Debe devolver un experto en nutrición', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'juan@gmail.com'
            }
        });
        expect(experto.correo).toBe('juan@gmail.com');
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

describe ('Update Experto', () => {

    test('Debe lanzar un error si el correo ya existe', async () => {
        await ExpertoNutricion.create({
            nombre: 'Ana',
            apellido_paterno: 'Lopez',
            apellido_materno: 'Martinez',
            contrasena: 'ana123',
            correo: 'ana@gmail.com',
            fecha_nacimiento: '1992-01-01',
            foto: 'ana.jpg',
            educacion: 'Licenciatura en Nutrición',
            perfil_profesional: 'Nutrióloga'
        });

        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'juan@gmail.com'
            }
        });

        experto.correo = 'ana@gmail.com';

        await expect(experto.save()).rejects.toThrow();
    });

    test('Debe actualizar un experto en nutrición', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'juan@gmail.com'
            }
        });
        experto.correo = 'juan2@gmail.com';
        await experto.save();

        const expertoActualizado = await ExpertoNutricion.findOne({
            where: {
                correo: 'juan2@gmail.com'
            }
        });
        expect(expertoActualizado.correo).toBe('juan2@gmail.com');
    });
});

describe ('Delete Experto', () => {

    test('Debe eliminar un experto en nutrición', async () => {
        const experto = await ExpertoNutricion.findOne({
            where: {
                correo: 'juan2@gmail.com'
            }
        });
        await experto.destroy();

        const expertoEliminado = await ExpertoNutricion.findOne({
            where: {
                correo: 'juan2@gmail.com'
            }
        });

        expect(expertoEliminado).toBeNull();
    });
});
