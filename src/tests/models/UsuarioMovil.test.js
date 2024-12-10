const { DataTypes } = require('sequelize');
const sequelize = require('../configTestDb');
const UsuarioMovil = require('../../models/UsuarioMovil');

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

describe('Create UsuarioMovil', () => {
    
    test('Debe crear un usuario móvil', async () => {
        const usuario = await UsuarioMovil.create({
            nombre_usuario: 'juan123',
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            apellido_materno: 'Gomez',
            contrasena: 'juan123',
            correo: 'juan@gmail.com',
            fecha_nacimiento: '1990-01-01',
            foto: 'juan.jpg',
            estatura: 1.70,
            peso: 70,
            sexo: true,
            id_objetivo: 1
        }, { transaction });

        expect(usuario.nombre_usuario).toBe('juan123');
    });

    test('Debe lanzar error si falta un campo requerido', async () => {
        await expect(UsuarioMovil.create({
            nombre_usuario: 'juan123',
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            contrasena: 'juan123',
            correo: 'juan@gmail.com',
        }, { transaction })).rejects.toThrow();
    });

    test('Debe lanzar error si el nombre de usuario ya existe', async () => {
        await expect(UsuarioMovil.create({
            nombre_usuario: 'skywhite',
            nombre: 'Juan',
            apellido_paterno: 'Perez',
            apellido_materno: 'Gomez',
            contrasena: 'juan123',
            correo: 'juan@gmail.com',
            fecha_nacimiento: '1990-01-01',
            foto: 'juan.jpg',
            estatura: 1.70,
            peso: 70,
            sexo: true,
            id_objetivo: 1
        }, { transaction })).rejects.toThrow();
    });
});

describe('Read UsuarioMovil', () => {

    test('Debe devolver un usuario móvil', async () => {
        const usuario = await UsuarioMovil.findOne({
            where: {
                nombre_usuario: 'skywhite'
            }
        });
        expect(usuario.nombre_usuario).toBe('skywhite');
    });

    test('Debe devolver nulo si el usuario no existe', async () => {
        const usuario = await UsuarioMovil.findOne({
            where: {
                nombre_usuario: 'usuarioPrueba'
            }
        });
        expect(usuario).toBeNull();
    });
});

describe('Update UsuarioMovil', () => {

    test('Debe lanzar un error si el nombre de usuario ya existe', async () => {
        const usuario = await UsuarioMovil.findOne({
            where: {
                nombre_usuario: 'skywhite'
            }
        }, { transaction });

        usuario.nombre_usuario = 'rulo23';
        await expect(usuario.save({ transaction })).rejects.toThrow();
    });

    test('Debe actualizar un usuario móvil', async () => {
        const usuario = await UsuarioMovil.findOne({
            where: {
                nombre_usuario: 'skywhite'
            }
        });

        usuario.nombre_usuario = 'miguelon1';
        await usuario.save({ transaction });

        const usuarioActualizado = await UsuarioMovil.findOne({
            where: {
                nombre_usuario: 'miguelon1'
            }
        }, { transaction });

        expect(usuarioActualizado.nombre_usuario).toBe('miguelon1');
    });
})

describe('Delete UsuarioMovil'), async () => {

    test('Debe eliminar un usuario móvil', async () => {
        const usuario = await UsuarioMovil.findOne({
            where: {
                nombre_usuario: 'skywhite'
            }
        });

        await usuario.destroy({ transaction });

        const usuarioEliminado = await UsuarioMovil.findOne({
            where: {
                nombre_usuario: 'skywhite'
            }
        }, { transaction });

        expect(usuarioEliminado).toBeNull();
    });
}