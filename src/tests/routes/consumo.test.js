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

describe('POST /api/medidietas/consumos', () => {
    test('Deberia registrar un consumo', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 1,
            id_alimento: 1,
            id_usuario_movil: 1
        }).set('x-token', token);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    test('Deberia retornar error si se registra ambos id_alimento y id_comida', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 1,
            id_alimento: 1,
            id_comida: 1,
            id_usuario_movil: 1
        }).set('x-token', token);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Debe registrar solo una comida o un alimento, no ambos.');
    });

    test('Deberia retornar error si no se registra ni id_alimento ni id_comida', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 1,
            id_usuario_movil: 1
        }).set('x-token', token);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Debe registrar solo una comida o un alimento, no ambos.');
    });

    test('Deberia retornar error si id_comida no existe', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 1,
            id_comida: 999,
            id_usuario_movil: 1
        }).set('x-token', token);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Comida no encontrada');
    });

    test('Deberia retornar error si id_alimento no existe', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 1,
            id_alimento: 999,
            id_usuario_movil: 1
        }).set('x-token', token);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Alimento no encontrado');
    });

    test('Deberia retornar error si id_usuario_movil no existe', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 1,
            id_alimento: 1,
            id_usuario_movil: 999
        }).set('x-token', token);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Usuario móvil no encontrado');
    });

    test('Deberia retornar error si id_momento no existe', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 999,
            id_alimento: 1,
            id_usuario_movil: 1
        }).set('x-token', token);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Momento no encontrado');
    });

    test('Deberia retornar error si no se envia token', async () => {
        const response = await request(server).post('/api/medidietas/consumos').send({
            fecha: '2021-12-01',
            cantidad: 100,
            id_momento: 1,
            id_alimento: 1,
            id_usuario_movil: 1
        });
        expect(response.status).toBe(401);
    });
});

describe('GET /api/medidietas/consumos/:nombre_usuario', () => {
    test('Deberia obtener consumos del dia por usuario', async () => {
        const response = await request(server).get('/api/medidietas/consumos/skywhite').send({
            fecha: '2024-12-05'
        }).set('x-token', token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Deberia retornar error si no se envia fecha', async () => {
        const response = await request(server).get('/api/medidietas/consumos/usuario1').send({}).set('x-token', token);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Fecha es requerida');
    });

    test('Deberia retornar error si usuario no existe', async () => {
        const response = await request(server).get('/api/medidietas/consumos/usuarioInexistente').send({
            fecha: '2021-12-01'
        }).set('x-token', token);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Usuario no encontrado');
    });

    test('Deberia retornar error si no se envia token', async () => {
        const response = await request(server).get('/api/medidietas/consumos/usuario1').send({
            fecha: '2021-12-01'
        });
        expect(response.status).toBe(401);
    });
});
