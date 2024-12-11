const request = require('supertest');
const sequelizeTest = require('../configTestDb');
const Server = require('../../models/server');
const server = new Server().app;

beforeAll(async () => {
    await sequelizeTest.sync({ force: true });
    const expertoToken = await request(server).post('/api/medidietas/expertos/login').send({
        correo: 'lgomez@ejemplo.com',
        contrasena: 'contrasena123'
    });
    token = expertoToken.header['x-token'];
})

afterAll(async () => {
    await sequelizeTest.close();
});

describe('Experto Login', () => {
    test('Debe hacer un login exitoso', async () => {
        const response = await request(server).post('/api/medidietas/expertos/login').send({
            correo: 'raulh230600@gmail.com',
            contrasena: 'pass'
        });

        expect(response.status).toBe(200);
        expect(response.body.experto.nombre).toBe('Raul');
    });

    test('Debe fallar si el correo es incorrecto', async () => {
        const response = await request(server).post('/api/medidietas/expertos/login').send({
            correo: 'correo@gmail.com',
            contrasena: 'pass'
        });

        expect(response.status).toBe(401);
    });

    test('Debe fallar si la contraseña es incorrecta', async () => {
        const response = await request(server).post('/api/medidietas/expertos/login').send({
            correo: 'raulh230600@gmail.com',
            contrasena: 'password'
        });

        expect(response.status).toBe(401);
    });
})

describe('LogOut', () => {
    test('Debe fallar si no hay token', async () => {
        const response = await request(server).post('/api/medidietas/expertos/logout');

        expect(response.status).toBe(401);
    })

    test('Debe cerrar sesión correctamente', async () => {
        const response = await request(server).post('/api/medidietas/expertos/logout').set('x-token', token);

        expect(response.status).toBe(200);
    })
});