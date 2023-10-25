const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const sequelize = db.sequelize;

const Productos = db.Producto;

const productosController = {

  'productosList': async (req, res) => {
    await db.Producto.findAll({ paranoid: false })
      .then(productos => {
        res.render('productosList.ejs', {productos})
      })
  },

  'productosCreate': async (req, res) => {

    const categorias =  await db.Categorias.findAll()
    res.render('productosCreate.ejs', {categorias: categorias})
    
  },

  'altaProducto': async (req, res) => {
    const productoNuevo = await db.Producto.create({
      ...req.body,
      "imagen_01":req.file.filename,
      //"imagen_02":req.file.filename,
      //"imagen_03":req.file.filename,

    })
    console.log(productoNuevo);
    res.redirect('/productosDetail/' + productoNuevo.id)
  },

  'productosDetail': async (req, res) => {
    let productoEncontrado = await db.Producto.findOne({ where: { id: req.params.id } })
    res.render('productosDetail', { producto: productoEncontrado })
  },

  'productosEdit': async (req, res) => {
    const categorias = await db.Categorias.findAll({ paranoid: false });
    const productoEncontrado = await db.Producto.findOne({ where: { id: req.params.id } });

    res.render('productosEdit', { categorias: categorias, producto: productoEncontrado })
  },

  'productosEditProcess': async (req, res) => {

    let productoEncontrado = await db.Producto.update({
      ...req.body,
      "imagen_01":req.file.filename,
    }, {
      where: {
        id: req.params.id
      }
    })
    console.log(productoEncontrado);
    res.redirect('/productosDetail/' + req.params.id)
  },

  'productosDelete': async (req, res) => {
    let productoEncontrado = await db.Producto.destroy({
      where: {
        id: req.params.id
      }
    })
    console.log(productoEncontrado);
    res.redirect('/productList')
  },

  'recuperarProducto': async (req, res) => {
    const productoRecuperado = await db.Producto.restore({
      where: {
        id: req.params.id
      }
    })
    console.log(productoRecuperado);
    res.redirect('/productList')
  }

}

module.exports = productosController;