const fs = require('fs');
const path = require('path');

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
    profile: (req,res)=>{
        let usuarioEncontrado = listaUsuarios.find(( user)=> user.id == req.params.id)
        res.render('profile', {usuario: usuarioEncontrado})
    },
    profileEdit: (req,res)=>{
        let usuarioEncontrado = listaUsuarios.find(( user)=> user.id == req.params.id)
        res.render('profileEdit', {usuario: usuarioEncontrado})
    },
    profileEditProcess: (req, res) => {
        let usuarioEncontrado = listaUsuarios.find(( user)=> user.id == req.params.id)
        
        
        usuarioEncontrado.userName = req.body.userName;
        usuarioEncontrado.firstName = req.body.firstName;
        usuarioEncontrado.lastName = req.body.lastName;
        usuarioEncontrado.email = req.body.email;
        usuarioEncontrado.adress = req.body.adress;
        usuarioEncontrado.city = req.body.city;
        usuarioEncontrado.telephone = req.body.telephone;
        usuarioEncontrado.avatar = req.file.filename;
        
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(listaUsuarios, null, 2), 'utf-8')
    
        res.render('profileEdit', {usuario: usuarioEncontrado})
    },
    altaUser:(req, res)=>{
        let usuarioNuevo = {
            "id":listaUsuarios.length + 1,
            /*"userName":req.body.nombre,*/
            "name":req.body.nombre,
            "lastName": req.body.apellido, 
            "email": req.body.email, 
            "password": req.body.password,
            "avatar": req.file.filename,
            "role": "usuario",
            "deleted": false
        };
        listaUsuarios.push(usuarioNuevo);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(listaUsuarios, null,2), 'utf-8')
        res.redirect('/')
    }

}

module.exports = userController