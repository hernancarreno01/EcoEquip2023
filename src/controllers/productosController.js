const db = require('../database/models');

const productosController = {
  // Rutas para la lista de productos
  add: function (req, res) {
    res.render('productosAdd')
  },

  create: async function (req, res) {
      const productoCreado = await db.Producto.create({
        ...req.body
      })
      res.redirect('/productos')
    },
  
  detail: function (req, res) {
      res.render('productosAdd')
    },
  
  list: (req, res) => {
      const productos = db.Producto.findAll();
      res.json(productos);
  },


  // Rutas para la creación y edición de productos

  new: (req, res) => {
    res.render('productosNew');
  },

  edit: async function (req, res) {
    const producto = await db.Producto.findByPk(req.params.id); // Corregido findByPK a findByPk
    res.render('productosEdit', { Producto: producto }); // Corregido Producto a producto
  },

  update: async function (req, res) {
    const productoEditado = await db.Producto.update(
      { ...req.body },
      { where: {
          id: req.params.id
        }
      }
    );
    res.redirect('/productos'); // Cambié req.redirect a res.redirect
  },

  // Rutas para la eliminación de productos

  delete: (req, res) => {
    res.render('productosDelete');
  },

  destroy: async (req, res) => {
    try {
      const productoBorrado = await db.Producto.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(productoBorrado);
      res.redirect('/productosList');
    } catch (error) {
      console.error(error);
      // Maneja el error de alguna manera
    }
  },
};

module.exports = productosController;