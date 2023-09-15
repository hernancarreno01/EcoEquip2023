const fs = require('fs');
const path = require('path');
const multer = require('multer');

let listaProductos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));

const productController = {
    productCreate: (req, res) => {
        res.render('productCreate');
    },
    productCart:  (req, res) => {
        res.render('productCart');
    },
    productDetail:  (req, res) => {
        let productoEncontrado = listaProductos.find(( producto)=> producto.id == req.params.id)
    
        res.render('productDetail', {producto: productoEncontrado} );
    },
    productModify: (req, res) => {
        let productoEncontrado = listaProductos.find(( producto)=> producto.id == req.params.id)
        res.render('productModify', {producto: productoEncontrado})
    },
    productList: (req, res)=>{
        let productosVisibles = listaProductos.filter((user)=> user.deleted == false);
        res.render('productList',{listaProductos: productosVisibles}) 
    },    
    productCreateProcess:(req, res)=>{
        let productoNuevo = {
            "id":listaProductos.length + 1,
            "name":req.body.nombre,
            "category":req.body.categoria,
            "image":req.file.filename,
            /*"image2":req.body.imagen_color1,
            "image3":req.body.imagen_color2,
            "image4":req.body.imagen_color3,*/
            "description":req.body.descripcion,
            "price":req.body.precio,
            "deleted":false
        };
        listaProductos.push(productoNuevo);
        fs.writeFileSync(path.join(__dirname, '../data/products.json'),JSON.stringify(listaProductos, null,2), 'utf-8')
        res.redirect('/')
    },
    productModifyProcess: (req, res) => {
        let productoEncontrado = listaProductos.find(( producto)=> producto.id == req.params.id)
        
        
        productoEncontrado.name = req.body.nombre;
        productoEncontrado.category = req.body.categoria;
        productoEncontrado.image = req.body.imagen_principal;
        productoEncontrado.description = req.body.descripcion;
        productoEncontrado.price = req.body.precio;
        productoEncontrado.image = req.file.filename;
        
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(listaProductos, null, 2), 'utf-8')
    
        res.render('productModify', {producto: productoEncontrado})
    },
    productDelete:  (req, res) => {
        let productoEncontrado = listaProductos.find(( producto)=> producto.id == req.params.id)
    
        productoEncontrado.deleted = true;        
        
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(listaProductos, null, 2), 'utf-8')
        res.render('productModify', {producto: productoEncontrado})
    },
    recuperarProcess:  (req, res) => {
        let productoEncontrado = listaProductos.find(( producto)=> producto.id == req.params.id)
    
        productoEncontrado.deleted = false;        
        
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(listaProductos, null, 2), 'utf-8')
        res.render('productModify', {producto: productoEncontrado})
    }

}

module.exports = productController