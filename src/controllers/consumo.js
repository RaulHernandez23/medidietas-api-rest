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

    // Normalizar la fecha para la comparación
    const fechaInicio = new Date(fecha);
    fechaInicio.setHours(0, 0, 0, 0);
    const fechaFin = new Date(fecha);
    fechaFin.setHours(23, 59, 59, 999);

    // Construir la condición de búsqueda
    const whereCondition = {
      fecha: {
        [Op.between]: [fechaInicio, fechaFin],
      },
      id_usuario_movil,
      id_momento,
    };

    if (id_alimento) {
      whereCondition.id_alimento = id_alimento;
    } else if (id_comida) {
      whereCondition.id_comida = id_comida;
    }

    // Buscar un consumo existente con la misma fecha, id_usuario_movil, id_momento y el mismo id_alimento o id_comida
    const consumoExistente = await Consumo.findOne({
      where: whereCondition,
    });

    if (consumoExistente) {
      // Actualizar la cantidad del consumo existente
      consumoExistente.cantidad =
        parseFloat(consumoExistente.cantidad) + parseFloat(cantidad);
      await consumoExistente.save();
      return res.status(200).json(consumoExistente);
    } else {
      // Crear un nuevo consumo
      const nuevoConsumo = await Consumo.create({
        fecha,
        cantidad,
        id_momento,
        id_alimento,
        id_comida,
        id_usuario_movil,
      });
      return res.status(201).json(nuevoConsumo);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerConsumosDelDiaPorUsuario = async (req, res) => {
  const { nombre_usuario, fecha } = req.params;

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
          attributes: [
            "nombre",
            "tamano_racion",
            "calorias",
            "carbohidratos",
            "grasas",
            "proteinas",
          ],
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
              attributes: ["calorias", "carbohidratos", "grasas", "proteinas"],
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
        id: consumo.id,
        nombre: consumo.alimento.nombre,
        tamano_racion: tamanoRacionFormatted,
        calorias: consumo.alimento.calorias,
        carbohidratos: consumo.alimento.carbohidratos,
        grasas: consumo.alimento.grasas,
        proteinas: consumo.alimento.proteinas,
        cantidad: consumo.cantidad,
        momento: consumo.momento ? consumo.momento.nombre : "Desconocido",
      };
    };

    // Función auxiliar para formatear comidas
    const formatearComida = (consumo) => {
      const totalCalorias = consumo.comida.alimentos.reduce(
        (sum, alimento) =>
          sum + alimento.calorias * (alimento.alimento_comida?.cantidad || 0),
        0
      );
      const totalCarbohidratos = consumo.comida.alimentos.reduce(
        (sum, alimento) =>
          sum +
          alimento.carbohidratos * (alimento.alimento_comida?.cantidad || 0),
        0
      );
      const totalGrasas = consumo.comida.alimentos.reduce(
        (sum, alimento) =>
          sum + alimento.grasas * (alimento.alimento_comida?.cantidad || 0),
        0
      );
      const totalProteinas = consumo.comida.alimentos.reduce(
        (sum, alimento) =>
          sum + alimento.proteinas * (alimento.alimento_comida?.cantidad || 0),
        0
      );
      return {
        id: consumo.id,
        nombre: consumo.comida.nombre,
        tamano_racion: "No aplica",
        calorias: totalCalorias,
        carbohidratos: totalCarbohidratos,
        grasas: totalGrasas,
        proteinas: totalProteinas,
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

const modificarConsumo = async (req, res) => {
  const { id } = req.params;
  const { cantidad, id_momento } = req.body;

  try {
    // Verificar que el consumo exista
    const consumo = await Consumo.findByPk(id);
    if (!consumo) {
      return res.status(404).json({ error: "Consumo no encontrado" });
    }

    // Verificar que el momento exista
    const momento = await Momento.findByPk(id_momento);
    if (!momento) {
      return res.status(400).json({ error: "Momento no encontrado" });
    }

    // Actualizar los atributos
    consumo.cantidad = cantidad;
    consumo.id_momento = id_momento;
    await consumo.save();

    res.status(200).json({ mensaje: "Consumo modificado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarConsumo = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar que el consumo exista
    const consumo = await Consumo.findByPk(id);
    if (!consumo) {
      return res.status(404).json({ error: "Consumo no encontrado" });
    }

    // Eliminar el consumo
    await consumo.destroy();

    res.status(200).json({ mensaje: "Consumo eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registrarConsumo,
  obtenerConsumosDelDiaPorUsuario,
  modificarConsumo,
  eliminarConsumo,
};
