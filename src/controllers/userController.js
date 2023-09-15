const fs = require('fs');
const path = require('path');
const multer = require('multer');

let listaUsuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

const userController = {
    login:  (req, res) => {
        res.render('login');
    },    
    register: (req, res) => {
        res.render('register');
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

module.exports = userController