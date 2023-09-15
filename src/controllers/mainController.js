const fs = require('fs');
const path = require('path');
const multer = require('multer');

let listaProductos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));
let listaUsuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));


const controller = {
    home: (req, res) => {
        res.render('home');
    },
    login:  (req, res) => {
        res.render('login');
    },
    productCart:  (req, res) => {
        res.render('productCart');
    },
    productDetail:  (req, res) => {
        let productoEncontrado = listaProductos.find(( producto)=> producto.id == req.params.id)
    
        res.render('productDetail', {producto: productoEncontrado} );
    },
    register: (req, res) => {
        res.render('register');
    },
    header: (req, res) => {
        res.render('header');
    },
    header2: (req, res) => {
        res.render('header2');
    },
    productCreate: (req, res) => {
        res.render('productCreate');
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
    },
    users: (req, res)=>{
        let usuariosVisibles = listaUsuarios.filter((user)=> user.deleted == false);
        res.render('users',{listadoUsuarios: usuariosVisibles})
    },
    altaUser:(req, res)=>{
        let usuarioNuevo = {
            "id":listaUsuarios.length + 1,
            /*"userName":req.body.nombre,*/
            "name":req.body.nombre,
            "lastName": req.body.apellido, 
            "email": req.body.email, 
            "password": req.body.password,
            "role": "usuario",
            "deleted": false
        };
        listaUsuarios.push(usuarioNuevo);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(listaUsuarios, null,2), 'utf-8')
        res.redirect('/')
    }
}

module.exports = controller