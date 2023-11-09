const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;

const Productos = db.Producto;

const productosController = {
  productosList: async (req, res) => {
    await db.Producto.findAll({ paranoid: false }).then((productos) => {
      res.render("productosList.ejs", { productos });
    });
  },

  productosCreate: async (req, res) => {
    const categorias = await db.Categorias.findAll();
    res.render("productosCreate.ejs", { categorias: categorias });
  },

  altaProducto: async (req, res) => {
    const productoNuevo = await db.Producto.create({
      ...req.body,
      imagen_01: req.file.filename,
      //"imagen_02":req.file.filename,
      //"imagen_03":req.file.filename,
    });
    console.log(productoNuevo);
    res.redirect("/productosDetail/" + productoNuevo.id);
  },

  productosDetail: async (req, res) => {
    try {
      const productoEncontrado = await db.Producto.findByPk(req.params.id, {
        include: [{ model: db.Categorias, as: "categoria" }],
      });

      if (productoEncontrado) {
        res.render("productosDetail", { producto: productoEncontrado });
      } else {
        res.status(404).send("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al buscar el producto: " + error);
      res.status(500).send("Error interno del servidor.");
    }
  },

  productosEdit: async (req, res) => {
    const categorias = await db.Categorias.findAll({ paranoid: false });
    const productoEncontrado = await db.Producto.findOne({
      where: { id: req.params.id },
    });

    res.render("productosEdit", {
      categorias: categorias,
      producto: productoEncontrado,
    });
  },

  productosEditProcess: async (req, res) => {
    let productoEncontrado = await db.Producto.update(
      {
        ...req.body,
        imagen_01: req.file.filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    async function productosEditProcess(req, res) {
      try {
        // Lógica para obtener y validar datos del formulario

        // Intenta actualizar el producto
        const productoActualizado = await Producto.update(nuevosDatos, {
          where: { id: productId },
        });

        // Envía una respuesta exitosa si la actualización fue exitosa
        res.status(200).json({ mensaje: "Producto actualizado correctamente" });
      } catch (error) {
        // Manejo de errores, incluyendo errores de validación
        if (error instanceof Sequelize.ValidationError) {
          res
            .status(400)
            .json({ error: "Error de validación", detalles: error.errors });
        } else {
          res.status(500).json({ error: "Error interno del servidor" });
        }
      }
    }

    console.log(productoEncontrado);
    res.redirect("/productosDetail/" + req.params.id);
  },

  deleteProcess: (req, res) => {
    db.Producto.destroy({ where: { id: req.params.id } });
    return res.redirect("/");
  },
  undelteProcess: (req, res) => {
    db.Producto.restore({ where: { id: req.params.id } });
    return res.redirect("/");
  },
};

module.exports = productosController;
