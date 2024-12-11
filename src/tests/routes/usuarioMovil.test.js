const request = require('supertest');
const sequelizeTest = require('../configTestDb');
const Server = require('../../models/server');
const server = new Server().app;

beforeAll(async () => {
    await sequelizeTest.sync({ force: true });
    const usuarioToken = await request(server).post('/api/medidietas/usuarios/login').send({
        correo: 'raulh230600@gmail.com',
        contrasena: 'pass'
    });
    token = usuarioToken.header['x-token'];
})

afterAll(async () => {
    await sequelizeTest.close();
});

describe('Usuario Login', () => {
    test('Debe hacer un login exitoso', async () => {
        const response = await request(server).post('/api/medidietas/usuarios/login').send({
            correo: 'miguel@gmail.com',
            contrasena: 'Morales300802'
        });

        expect(response.status).toBe(200);
        expect(response.body.usuario.nombre).toBe('Miguel');
    })

    test('Debe fallar si el correo es incorrecto', async () => {
        const response = await request(server).post('/api/medidietas/usuarios/login').send({
            correo: 'correo@prueba.com',
            contrasena: 'pass'
        });

        expect(response.status).toBe(401);
    });

    test('Debe fallar si la contraseña es incorrecta', async () => {
        const response = await request(server).post('/api/medidietas/usuarios/login').send({
            correo: 'miguel@gmail.com',
            contrasena: 'password'
        });

        expect(response.status).toBe(401);
    });
});



describe('Usuario Editar', () => {
    test('Debe actualizar el usuario correctamente', async () => {
        const response = await request(server).put('/api/medidietas/usuarios/skywhite').send({
            usuarioMovil: {
                nombre_usuario: 'skywhite',
                nombre: 'Usuario Actualizado',
                apellido_paterno: 'Paterno',
                apellido_materno: 'Materno',
                contrasena: 'pass',
                correo: 'actualizado@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1200,
                carbohidratos: 200,
                grasas: 60,
                proteinas: 90
            }
        }).set('x-token', token);

        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('Usuario actualizado correctamente');
    });

    test('Debe fallar si el usuario no existe', async () => {
        const response = await request(server).put('/api/medidietas/usuarios/usuarioNoExiste').send({
            usuarioMovil: {
                nombre_usuario: 'usuarioNoExiste',
                nombre: 'Usuario No Existe',
                apellido_paterno: 'Paterno',
                apellido_materno: 'Materno',
                contrasena: 'pass',
                correo: 'noexiste@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1200,
                carbohidratos: 200,
                grasas: 60,
                proteinas: 90
            }
        }).set('x-token', token);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Usuario no encontrado');
    });

    test('Debe fallar si el nuevo nombre de usuario ya existe', async () => {
        await request(server).post('/api/medidietas/usuarios/signup').send({
            usuarioMovil: {
                nombre_usuario: 'usuarioExistente',
                nombre: 'Usuario Existente',
                apellido_paterno: 'Paterno',
                apellido_materno: 'Materno',
                contrasena: 'pass',
                correo: 'existente@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1111,
                carbohidratos: 250,
                grasas: 50,
                proteinas: 100
            }
        });

        const response = await request(server).put('/api/medidietas/usuarios/skywhite').send({
            usuarioMovil: {
                nombre_usuario: 'usuarioExistente',
                nombre: 'Usuario Actualizado',
                apellido_paterno: 'Paterno',
                apellido_materno: 'Materno',
                contrasena: 'pass',
                correo: 'actualizado@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1200,
                carbohidratos: 200,
                grasas: 60,
                proteinas: 90
            }
        }).set('x-token', token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Este nombre de usuario no se encuentra disponible');
    });

    test('Debe fallar si no se envia el token', async () => {
        const response = await request(server).put('/api/medidietas/usuarios/skywhite').send({
            usuarioMovil: {
                nombre_usuario: 'skywhite',
                nombre: 'Usuario Actualizado',
                apellido_paterno: 'Paterno',
                apellido_materno: 'Materno',
                contrasena: 'pass',
                correo: 'si@gmail.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1200,
                carbohidratos: 200,
                grasas: 60,
                proteinas: 90
            }
        });

        expect(response.status).toBe(401);
    });
});

describe('Obtener Usuario Por Nombre', () => {
    test('Debe obtener un usuario correctamente', async () => {
        const response = await request(server).get('/api/medidietas/usuarios/skywhite').set('x-token', token);

        expect(response.status).toBe(200);
        expect(response.body.nombre_usuario).toBe('skywhite');
    });

    test('Debe fallar si el usuario no existe', async () => {
        const response = await request(server).get('/api/medidietas/usuarios/usuarioNoExiste').set('x-token', token);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Usuario no encontrado');
    });

    test('Debe fallar si no se envia el token', async () => {
        const response = await request(server).get('/api/medidietas/usuarios/skywhite');

        expect(response.status).toBe(401);
    });
});

describe('Crear Usuario Movil', () => {
    test('Debe crear un usuario correctamente', async () => {
        const response = await request(server).post('/api/medidietas/usuarios/signup').send({
            usuarioMovil: {
                nombre_usuario: 'nuevoUsuario',
                nombre: 'Nuevo',
                apellido_paterno: 'Usuario',
                apellido_materno: 'Prueba',
                contrasena: 'pass',
                correo: 'nuevo@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1500,
                carbohidratos: 200,
                grasas: 50,
                proteinas: 100
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('Usuario registrado correctamente');
    });

    test('Debe fallar si el nombre de usuario ya existe', async () => {
        await request(server).post('/api/medidietas/usuarios/signup').send({
            usuarioMovil: {
                nombre_usuario: 'usuarioExistente',
                nombre: 'Usuario',
                apellido_paterno: 'Existente',
                apellido_materno: 'Prueba',
                contrasena: 'pass',
                correo: 'existente@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1500,
                carbohidratos: 200,
                grasas: 50,
                proteinas: 100
            }
        });

        const response = await request(server).post('/api/medidietas/usuarios/signup').send({
            usuarioMovil: {
                nombre_usuario: 'usuarioExistente',
                nombre: 'Usuario',
                apellido_paterno: 'Existente',
                apellido_materno: 'Prueba',
                contrasena: 'pass',
                correo: 'existente2@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 1500,
                carbohidratos: 200,
                grasas: 50,
                proteinas: 100
            }
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('El nombre de usuario ya existe');
    });

    test('Debe fallar si hay un error en la creación del usuario', async () => {
        const response = await request(server).post('/api/medidietas/usuarios/signup').send({
            usuarioMovil: {
                nombre_usuario: 'nuevoUsuario',
                nombre: 'Nuevo',
                apellido_paterno: 'Usuario',
                apellido_materno: 'Prueba',
                contrasena: 'pass',
                correo: 'nuevo@prueba.com',
                fecha_nacimiento: '1999-01-01',
                foto: 'foto.jpg',
                estatura: 1.70,
                peso: 70,
                sexo: true
            },
            objetivo: {
                calorias: 'invalid',
                carbohidratos: 200,
                grasas: 50,
                proteinas: 100
            }
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    }); 
});

describe('Cerrar Sesión', () => {

    test('Debe fallar si no se envía el token', async () => {
        const response = await request(server).post('/api/medidietas/usuarios/logout');

        expect(response.status).toBe(401);
    });

    test('Debe cerrar la sesión correctamente', async () => {
        const response = await request(server).post('/api/medidietas/usuarios/logout').set('x-token', token);

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Sesión cerrada correctamente');
    });
});
