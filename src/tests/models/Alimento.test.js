const { DataTypes } = require('sequelize');
const sequelize = require('../configTestDb');
const Alimento = require('../../models/Alimento');

beforeAll(async () => {
    await sequelizeTest.sync({ force: true });
});

afterAll(async () => {
    await sequelizeTest.close();
})

DESCRIBE('Create Alimento', () => {

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
        })
    })
})