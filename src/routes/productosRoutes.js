const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Rutas para la lista de productos
/*
router.get('/productos', (req, res) => {
  const productos = db.Producto.findAll();
  res.json(productos);
});
*/

router.get('/productos', productosController.list);
router.get('/productos/new', productosController.new);
router.get('/productos/detail/:id', productosController.detail);

// Rutas para la creación y edición de productos
router.get('/productos/add', productosController.add);
router.post('/productos/create', productosController.create);
router.get('/productos/edit/:id', productosController.edit);
router.post('/productos/update/:id', productosController.update);
// Rutas para la eliminación de productos
//
//router.get('/productos/delete/:id', productosController.delete);
//router.post('/productos/delete/:id', productosController.destroy);

module.exports = router;