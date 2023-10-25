const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const sequelize = db.sequelize;

const Usuarios = db.Usuario;
//let listaUsuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

const userController = {
    'login': async (req, res) => {
        res.render('login');
    },    
    'register': async (req, res) => {
        let ciudades = await db.Ciudad.findAll({paranoid: false})
        let roles = await db.Rol.findAll({paranoid: false})
        res.render('register.ejs', {ciudad: ciudades, rol: roles})
        /*await db.Ciudad.findAll({paranoid: false})
            .then(ciudad => {
                res.render('register.ejs', {ciudad})
            }) */       
    },
     
    'users': async (req, res)=>{
        await db.Usuario.findAll({paranoid: false})
            .then(usuarios => {
                res.render('users.ejs', {usuarios})
            })        
    },
    'profile': async (req,res)=>{
        // let usuarioEncontrado = await db.Usuario.findByPk(req.params.id,{paranoid: false})
        let usuarioEncontrado = await db.Usuario.findOne({ where: { id: req.params.id } })
        res.render('profile', {usuario: usuarioEncontrado})
    },
    'profileEdit': async (req,res)=>{
        const ciudades = await db.Ciudad.findAll({ paranoid: false });
        let roles = await db.Rol.findAll({paranoid: false})
        const usuarioEncontrado = await db.Usuario.findOne({ 
            where: { id: req.params.id }
        });   
        
        res.render('profileEdit', { ciudad: ciudades, rol: roles, usuario: usuarioEncontrado})
    },
    'profileEditProcess': async (req, res) => {
        
        let usuarioEncontrado = await db.Usuario.update({
            ...req.body,
            "imagen_perfil": req.file.filename
        },{where:{
                id: req.params.id
            }})
            console.log(usuarioEncontrado);
            res.redirect('/profile/'+ usuarioEncontrado.id)
        
        /*let usuarioEncontrado = await listaUsuarios.find(( user)=> user.id == req.params.id)
                
        usuarioEncontrado.userName = req.body.userName;
        usuarioEncontrado.firstName = req.body.firstName;
        usuarioEncontrado.lastName = req.body.lastName;
        usuarioEncontrado.email = req.body.email;
        usuarioEncontrado.adress = req.body.adress;
        usuarioEncontrado.city = req.body.city;
        usuarioEncontrado.telephone = req.body.telephone;
        usuarioEncontrado.avatar = req.file.filename;
        
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(listaUsuarios, null, 2), 'utf-8')
    
        res.render('profileEdit', {usuario: usuarioEncontrado})*/
    },
    'altaUser': async (req, res)=> {        
        const usuarioNuevo = await db.Usuario.create({
                ...req.body,
                "imagen_perfil": req.file.filename,
                "roles_id ":2
        })
        console.log(usuarioNuevo);
        res.redirect('/profile/'+ usuarioNuevo.id)
        /*let usuarioNuevo = {
            "id":listaUsuarios.length + 1,
            "username":req.body.nombre_usuario,
            "name":req.body.nombre,
            "lastName": req.body.apellido, 
            "email": req.body.email,
            "adress":req.body.direccion,
            "city":req.body.ciudad,
            "password": req.body.contrasenia,usuarioNuevo
            "avatar":req.file.filename,
            "telephone":req.body.telefono,
            "role": "usuario",
            "deleted": false
        };
        listaUsuarios.push(usuarioNuevo);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(listaUsuarios, null,2), 'utf-8')*/
        
    },
    'userDelete': async (req, res) => {
        let usuarioEncontrado = await db.Usuario.destroy({where:{
            id: req.params.id
        }})
        console.log(usuarioEncontrado);
        res.redirect('/users')
        /*let usuarioEncontrado = listaUsuarios.find(( user)=> user.id == req.params.id)
    
        usuarioEncontrado.deleted = true;        
        
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(listaUsuarios, null, 2), 'utf-8')
        res.render('profileEdit', {usuario: usuarioEncontrado})*/
    },
    'recuperarProcess': async (req, res) => {
        const usuarioRecuperado = await db.Usuario.restore({where:{
            id: req.params.id
        }})
        console.log(usuarioRecuperado);
        res.redirect('/users')
        

        /*let usuarioEncontrado = listaUsuarios.find(( user)=> user.id == req.params.id)    
        usuarioEncontrado.deleted = false;      
        
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(listaUsuarios, null, 2), 'utf-8')
        res.render('profileEdit', {usuario: usuarioEncontrado})*/
    }

}

module.exports = userController