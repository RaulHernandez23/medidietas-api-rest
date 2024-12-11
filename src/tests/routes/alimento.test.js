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

describe('GET /api/medidietas/alimentos', () => {
    test('Debería regresar todos los alimentos', async () => {
        const response = await request(server).get('/api/medidietas/alimentos').set('x-token', token);

        expect(response.statusCode).toEqual(200);
    });

    test('Deberia regresar un error 401 si no se envía un token', async () => {
        const response = await request(server)
            .get('/api/medidietas/alimentos');

        expect(response.statusCode).toEqual(401);
    });
});

describe('GET /api/medidietas/alimentos/:id', () => {
    test('Debería regresar un alimento por ID', async () => {
        const response = await request(server)
            .get(`/api/medidietas/alimentos/1`)
            .set('x-token', token);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    test('Debería regresar un error 404 si el alimento no existe', async () => {
        const response = await request(server)
            .get('/api/medidietas/alimentos/9999')
            .set('x-token', token);

        expect(response.statusCode).toEqual(404);
        expect(response.body).toHaveProperty('error', 'Alimento no encontrado');
    });

    test('Debería regresar un error 404 si el ID no es válido', async () => {
        const response = await request(server)
            .get('/api/medidietas/alimentos/invalid-id')
            .set('x-token', token);

        expect(response.statusCode).toEqual(404);
    });

    test('Deberia regresar un error 401 si no se envía un token', async () => {
        const response = await request(server)
            .get('/api/medidietas/alimentos/1');

        expect(response.statusCode).toEqual(401);
    });
});

describe('POST /api/medidietas/alimentos', () => {
    test('Debería registrar un nuevo alimento', async () => {
        const nuevoAlimento = {
            nombre: 'Zanahoria',
            calorias: 52,
            carbohidratos: 14,
            grasas: 0.2,
            imagen: 'zanahoria.jpg',
            proteinas: 0.3,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        };

        const response = await request(server)
            .post('/api/medidietas/alimentos')
            .set('x-token', token)
            .send(nuevoAlimento);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('mensaje', 'Alimento registrado correctamente');
    });

    test('Debería regresar un error 400 si ya existe un alimento con el mismo nombre', async () => {
        const alimentoExistente = {
            nombre: 'Manzana',
            calorias: 52,
            carbohidratos: 14,
            grasas: 0.2,
            imagen: 'manzana.jpg',
            proteinas: 0.3,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        };

        const response = await request(server)
            .post('/api/medidietas/alimentos')
            .set('x-token', token)
            .send(alimentoExistente);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('error', 'Ya existe un alimento con el mismo nombre');
    });

    test('Debería regresar un error 400 si hay un error en la solicitud', async () => {
        const alimentoInvalido = {
            nombre: '',
            calorias: -10,
            carbohidratos: 'invalid',
            grasas: null,
            imagen: '',
            proteinas: -5,
            tamano_racion: 'invalid',
            marca: '',
            id_categoria: 'invalid',
            id_unidad_medida: 'invalid'
        };

        const response = await request(server)
            .post('/api/medidietas/alimentos')
            .set('x-token', token)
            .send(alimentoInvalido);

        expect(response.statusCode).toEqual(400);
    });

    test('Debería regresar un error 401 si no se envía un token', async () => {
        const nuevoAlimento = {
            nombre: 'Guayaba',
            calorias: 57,
            carbohidratos: 15,
            grasas: 0.1,
            imagen: 'pera.jpg',
            proteinas: 0.4,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        };

        const response = await request(server)
            .post('/api/medidietas/alimentos')
            .send(nuevoAlimento);

        expect(response.statusCode).toEqual(401);
    });
});

describe('PUT /api/medidietas/alimentos/:id', () => {
    test('Debería actualizar un alimento existente', async () => {
        const alimentoActualizado = {
            nombre: 'Zanahoria Actualizada',
            calorias: 50,
            carbohidratos: 12,
            grasas: 0.1,
            imagen: 'zanahoria_actualizada.jpg',
            proteinas: 0.4,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        };

        const response = await request(server)
            .put('/api/medidietas/alimentos/1')
            .set('x-token', token)
            .send(alimentoActualizado);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('mensaje', 'Alimento actualizado correctamente');
    });

    test('Debería regresar un error 404 si el alimento no existe', async () => {
        const alimentoActualizado = {
            nombre: 'Zanahoria Actualizada',
            calorias: 50,
            carbohidratos: 12,
            grasas: 0.1,
            imagen: 'zanahoria_actualizada.jpg',
            proteinas: 0.4,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        };

        const response = await request(server)
            .put('/api/medidietas/alimentos/9999')
            .set('x-token', token)
            .send(alimentoActualizado);

        expect(response.statusCode).toEqual(404);
        expect(response.body).toHaveProperty('error', 'Alimento no encontrado');
    });

    test('Debería regresar un error 400 si ya existe un alimento con el mismo nombre', async () => {
        await request(server).post('/api/medidietas/alimentos').set('x-token', token).send({
            nombre: 'Manzana',
            calorias: 52,
            carbohidratos: 14,
            grasas: 0.2,
            imagen: 'manzana.jpg',
            proteinas: 0.3,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        });

        const alimentoActualizado = {
            nombre: 'Manzana',
            calorias: 50,
            carbohidratos: 12,
            grasas: 0.1,
            imagen: 'manzana_actualizada.jpg',
            proteinas: 0.4,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        };
        // Cambiar el nombre de la manzana a uno que ya existe
        const response = await request(server)
            .put('/api/medidietas/alimentos/2')
            .set('x-token', token)
            .send(alimentoActualizado);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('error', 'Ya existe un alimento con el mismo nombre');
    });

    test('Debería regresar un error 400 si hay un error en la solicitud', async () => {
        const alimentoInvalido = {
            nombre: '',
            calorias: -10,
            carbohidratos: 'invalid',
            grasas: null,
            imagen: '',
            proteinas: -5,
            tamano_racion: 'invalid',
            marca: '',
            id_categoria: 'invalid',
            id_unidad_medida: 'invalid'
        };

        const response = await request(server)
            .put('/api/medidietas/alimentos/1')
            .set('x-token', token)
            .send(alimentoInvalido);

        expect(response.statusCode).toEqual(400);
    });

    test('Debería regresar un error 401 si no se envía un token', async () => {
        const alimentoActualizado = {
            nombre: 'Guayaba Actualizada',
            calorias: 57,
            carbohidratos: 15,
            grasas: 0.1,
            imagen: 'guayaba_actualizada.jpg',
            proteinas: 0.4,
            tamano_racion: 100,
            marca: 'Frutas SA',
            id_categoria: 1,
            id_unidad_medida: 1
        };

        const response = await request(server)
            .put('/api/medidietas/alimentos/1')
            .send(alimentoActualizado);

        expect(response.statusCode).toEqual(401);
    });
});

describe('DELETE /api/medidietas/alimentos/:id', () => {
    test('Debería eliminar un alimento existente', async () => {
        const response = await request(server)
            .delete('/api/medidietas/alimentos/1')
            .set('x-token', token);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('mensaje', 'Alimento eliminado correctamente');
    });

    test('Debería regresar un error 404 si el alimento no existe', async () => {
        const response = await request(server)
            .delete('/api/medidietas/alimentos/9999')
            .set('x-token', token);

        expect(response.statusCode).toEqual(404);
        expect(response.body).toHaveProperty('error', 'Alimento no encontrado');
    });

    test('Debería regresar un error 400 si hay un error en la solicitud', async () => {
        const response = await request(server)
            .delete('/api/medidietas/alimentos/invalid-id')
            .set('x-token', token);

        expect(response.statusCode).toEqual(404);
    });

    test('Debería regresar un error 401 si no se envía un token', async () => {
        const response = await request(server)
            .delete('/api/medidietas/alimentos/1');

        expect(response.statusCode).toEqual(401);
    });
});

describe('GET /api/medidietas/unidades-medida', () => {
    test('Debería regresar todas las unidades de medida', async () => {
        const response = await request(server)
            .get('/api/medidietas/alimentos/unidades-medida');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('GET /api/medidietas/alimentos/categorias', () => {
    test('Debería regresar todas las categorías', async () => {
        const response = await request(server)
            .get('/api/medidietas/alimentos/categorias');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

});
