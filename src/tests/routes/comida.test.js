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

describe('GET /api/medidietas/comidas', () => {
    test('Debe regresar todas las comidas', async () => {
        const response = await request(server).get('/api/medidietas/comidas').set('x-token', token);
        expect(response.statusCode).toBe(200);
    });

    test('Deberia regresar un error 401 si no se envia el token', async () => {
        const response = await request(server).get('/api/medidietas/comidas');
        expect(response.statusCode).toBe(401);
    });
});

describe('GET /api/medidietas/comidas/:id', () => {
    test('Debe regresar una comida por id', async () => {
        const response = await request(server).get('/api/medidietas/comidas/1').set('x-token', token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre', 'Ensalada de manzana');
    });

    test('Debe regresar un error 404 si la comida no existe', async () => {
        const response = await request(server).get('/api/medidietas/comidas/9999').set('x-token', token);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Comida no encontrada');
    });

    test('Debe regresar un error 404 si el id no es valido', async () => {
        const response = await request(server).get('/api/medidietas/comidas/abc').set('x-token', token);
        expect(response.statusCode).toBe(404);
    });

    test('Deberia regresar un error 401 si no se envia el token', async () => {
        const response = await request(server).get('/api/medidietas/comidas/1');
        expect(response.statusCode).toBe(401);
    });
});

describe('POST /api/medidietas/comidas', () => {
    test('Debe registrar una nueva comida', async () => {
        const nuevaComida = {
            nombre: 'Ensalada de frutas',
            preparacion_video: 'http://video.com/ensalada',
            receta: 'Cortar frutas y mezclar',
            estado: true,
            alimentos: [
                { nombre: 'Manzana', cantidad: 2 }
            ]
        };
        const response = await request(server).post('/api/medidietas/comidas').set('x-token', token).send(nuevaComida);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('mensaje', 'Comida registrada correctamente');
    });

    test('Debe regresar un error 400 si ya existe una comida con el mismo nombre', async () => {
        const comidaDuplicada = {
            nombre: 'Ensalada de frutas',
            preparacion_video: 'http://video.com/ensalada',
            receta: 'Cortar frutas y mezclar',
            estado: true,
            alimentos: [
                { nombre: 'Manzana', cantidad: 2 }
            ]
        };
        const response = await request(server).post('/api/medidietas/comidas').set('x-token', token).send(comidaDuplicada);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Ya existe una comida con el mismo nombre');
    });

    test('Debe regresar un error 400 si uno o más alimentos no existen', async () => {
        const comidaInvalida = {
            nombre: 'Ensalada de vegetales',
            preparacion_video: 'http://video.com/ensalada',
            receta: 'Cortar vegetales y mezclar',
            estado: true,
            alimentos: [
                { nombre: 'Zanahoria', cantidad: 2 },
                { nombre: 'Pepino', cantidad: 3 }
            ]
        };
        const response = await request(server).post('/api/medidietas/comidas').set('x-token', token).send(comidaInvalida);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Uno o más alimentos no existen');
    });

    test('Deberia regresar un error 401 si no se envia el token', async () => {
        const nuevaComida = {
            nombre: 'Ensalada de frutas',
            preparacion_video: 'http://video.com/ensalada',
            receta: 'Cortar frutas y mezclar',
            estado: true,
            alimentos: [
                { nombre: 'Manzana', cantidad: 2 },
                { nombre: 'Banana', cantidad: 3 }
            ]
        };
        const response = await request(server).post('/api/medidietas/comidas').send(nuevaComida);
        expect(response.statusCode).toBe(401);
    });
});

describe('PUT /api/medidietas/comidas/:id', () => {
    test('Debe actualizar una comida existente', async () => {
        const comidaActualizada = {
            nombre: 'Ensalada de frutas actualizada',
            preparacion_video: 'http://video.com/ensalada_actualizada',
            receta: 'Cortar frutas y mezclar bien',
            estado: true,
            alimentos: [
                { nombre: 'Manzana', cantidad: 3 }
            ]
        };
        const response = await request(server).put('/api/medidietas/comidas/1').set('x-token', token).send(comidaActualizada);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('mensaje', 'Comida actualizada correctamente');
    });

    test('Debe regresar un error 404 si la comida no existe', async () => {
        const comidaInexistente = {
            nombre: 'Ensalada de frutas inexistente',
            preparacion_video: 'http://video.com/ensalada_inexistente',
            receta: 'Cortar frutas y mezclar bien',
            estado: true,
            alimentos: [
                { nombre: 'Manzana', cantidad: 3 }
            ]
        };
        const response = await request(server).put('/api/medidietas/comidas/9999').set('x-token', token).send(comidaInexistente);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Comida no encontrada');
    });

    test('Debe regresar un error 400 si ya existe una comida con el mismo nombre', async () => {
        const comidaDuplicada = {
            nombre: 'Comida de prueba',
            preparacion_video: 'http://video.com/ensalada',
            receta: 'Cortar frutas y mezclar',
            estado: true,
            alimentos: [
                { nombre: 'Manzana', cantidad: 2 }
            ]
        };
        const response = await request(server).put('/api/medidietas/comidas/1').set('x-token', token).send(comidaDuplicada);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Ya existe una comida con el mismo nombre');
    });

    test('Debe regresar un error 400 si uno o más alimentos no existen', async () => {
        const comidaInvalida = {
            nombre: 'Ensalada de vegetales',
            preparacion_video: 'http://video.com/ensalada',
            receta: 'Cortar vegetales y mezclar',
            estado: true,
            alimentos: [
                { nombre: 'Zanahoria', cantidad: 2 },
                { nombre: 'Pepino', cantidad: 3 }
            ]
        };
        const response = await request(server).put('/api/medidietas/comidas/1').set('x-token', token).send(comidaInvalida);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Uno o más alimentos no existen');
    });

    test('Deberia regresar un error 401 si no se envia el token', async () => {
        const comidaActualizada = {
            nombre: 'Ensalada de frutas actualizada',
            preparacion_video: 'http://video.com/ensalada_actualizada',
            receta: 'Cortar frutas y mezclar bien',
            estado: true,
            alimentos: [
                { nombre: 'Manzana', cantidad: 3 }
            ]
        };
        const response = await request(server).put('/api/medidietas/comidas/1').send(comidaActualizada);
        expect(response.statusCode).toBe(401);
    });
});

describe('DELETE /api/medidietas/comidas/:id', () => {
    test('Debe eliminar una comida existente', async () => {
        const response = await request(server).delete('/api/medidietas/comidas/1').set('x-token', token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('mensaje', 'Comida eliminada correctamente');
    });

    test('Debe regresar un error 404 si la comida no existe', async () => {
        const response = await request(server).delete('/api/medidietas/comidas/9999').set('x-token', token);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Comida no encontrada');
    });

    test('Debe regresar un error 404 si el id no es valido', async () => {
        const response = await request(server).delete('/api/medidietas/comidas/abc').set('x-token', token);
        expect(response.statusCode).toBe(404);
    });

    test('Deberia regresar un error 401 si no se envia el token', async () => {
        const response = await request(server).delete('/api/medidietas/comidas/1');
        expect(response.statusCode).toBe(401);
    });
});
