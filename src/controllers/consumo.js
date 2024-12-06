const { Op } = require("sequelize");
const Consumo = require("../models/Consumo");
const AlimentoComida = require("../models/Alimento_Comida");
const Comida = require("../models/Comida");
const Alimento = require("../models/Alimento");
const UsuarioMovil = require("../models/UsuarioMovil");
const Momento = require("../models/Momento");
const UnidadMedida = require("../models/UnidadMedida");

const registrarConsumo = async (req, res) => {
  const {
    fecha,
    cantidad,
    id_momento,
    id_alimento,
    id_comida,
    id_usuario_movil,
  } = req.body;

  try {
    // Verificar que solo se registre una comida o un alimento, no ambos
    if ((id_alimento && id_comida) || (!id_alimento && !id_comida)) {
      return res.status(400).json({
        error: "Debe registrar solo una comida o un alimento, no ambos.",
      });
    }

    // Verificar que las claves foráneas existen
    if (id_comida) {
      const comida = await Comida.findByPk(id_comida);
      if (!comida) {
        return res.status(400).json({ error: "Comida no encontrada" });
      }
    }

    if (id_alimento) {
      const alimento = await Alimento.findByPk(id_alimento);
      if (!alimento) {
        return res.status(400).json({ error: "Alimento no encontrado" });
      }
    }

    const usuarioMovil = await UsuarioMovil.findByPk(id_usuario_movil);
    if (!usuarioMovil) {
      return res.status(400).json({ error: "Usuario móvil no encontrado" });
    }

    const momento = await Momento.findByPk(id_momento);
    if (!momento) {
      return res.status(400).json({ error: "Momento no encontrado" });
    }

    const nuevoConsumo = await Consumo.create({
      fecha,
      cantidad,
      id_momento,
      id_alimento,
      id_comida,
      id_usuario_movil,
    });

    res.status(201).json(nuevoConsumo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerConsumosDelDiaPorUsuario = async (req, res) => {
  const { nombre_usuario } = req.params;
  const { fecha } = req.body;

  if (!fecha) {
    return res.status(400).json({ error: "Fecha es requerida" });
  }

  const fechaInicio = new Date(fecha);
  fechaInicio.setHours(0, 0, 0, 0);
  const fechaFin = new Date(fecha);
  fechaFin.setHours(23, 59, 59, 999);

  try {
    // Buscar el usuario por nombre de usuario
    const usuario = await UsuarioMovil.findOne({
      where: { nombre_usuario },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log(`Usuario encontrado: ${usuario.id}`);

    // Buscar los consumos del día para el usuario
    const consumos = await Consumo.findAll({
      where: {
        id_usuario_movil: usuario.id,
        fecha: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      include: [
        {
          model: Alimento,
          attributes: ["nombre", "tamano_racion", "calorias"],
          include: [
            {
              model: UnidadMedida,
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: Comida,
          include: [
            {
              model: Alimento,
              through: AlimentoComida,
              attributes: ["calorias"],
            },
          ],
        },
        {
          model: Momento,
          attributes: ["nombre"],
        },
      ],
    });

    console.log(`Consumos encontrados: ${consumos.length}`);
    console.log(`Datos sin formatear: ${JSON.stringify(consumos, null, 2)}`);

    // Función auxiliar para formatear alimentos
    const formatearAlimento = (consumo) => {
      const tamanoRacion = `${consumo.alimento.tamano_racion} ${
        consumo.alimento.unidad_medida
          ? consumo.alimento.unidad_medida.nombre
          : ""
      }`;
      const tamanoRacionFormatted =
        consumo.alimento.tamano_racion > 1 ? `${tamanoRacion}s` : tamanoRacion;

      return {
        nombre: consumo.alimento.nombre,
        tamano_racion: tamanoRacionFormatted,
        calorias: consumo.alimento.calorias,
        cantidad: consumo.cantidad,
        momento: consumo.momento ? consumo.momento.nombre : "Desconocido",
      };
    };

    // Función auxiliar para formatear comidas
    const formatearComida = (consumo) => {
      const totalCalorias = consumo.comida.alimentos.reduce(
        (sum, alimento) => sum + (alimento.calorias || 0),
        0
      );
      return {
        nombre: consumo.comida.nombre,
        tamano_racion: null,
        calorias: totalCalorias,
        cantidad: consumo.cantidad,
        momento: consumo.momento ? consumo.momento.nombre : "Desconocido",
      };
    };

    // Formatear la respuesta
    const respuesta = consumos
      .map((consumo) => {
        if (consumo.alimento) {
          console.log(
            `Formateando alimento: ${JSON.stringify(consumo.alimento)}`
          );
          return formatearAlimento(consumo);
        } else if (consumo.comida) {
          console.log(`Formateando comida: ${JSON.stringify(consumo.comida)}`);
          return formatearComida(consumo);
        } else {
          console.log(
            `Consumo sin alimento ni comida: ${JSON.stringify(consumo)}`
          );
          return null;
        }
      })
      .filter((item) => item !== null);

    console.log(`Respuesta formateada: ${JSON.stringify(respuesta)}`);

    res.status(200).json(respuesta);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registrarConsumo,
  obtenerConsumosDelDiaPorUsuario,
};
