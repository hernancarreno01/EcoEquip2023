
const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const sequelize = db.sequelize;

const Usuarios = db.Usuario;
//let listaUsuarios = JSON.parse(fs.readFigit leSync(path.join(__dirname, '../data/users.json'), 'utf-8'));
const bcryptjs = require('bcryptjs');
const { log } = require('util');


const userController = {
    login: (req, res) => {
        return res.render('login');
    }, 
    loginProcess: async (req, res) =>{
        console.log(req.body);
        console.log(req.session);
        const usuarioALoguear = await db.Usuario.findOne({ 
            where: { email: req.body.email }
        }); 
        if(usuarioALoguear){
            let contraseniaOk = bcryptjs.compareSync( req.body.contrasenia, usuarioALoguear.contrasenia);
            if(contraseniaOk){
                delete usuarioALoguear.contrasenia;              
                req.session.usuarioLogueado = usuarioALoguear;
                res.cookie("email", req.body.mail, { maxAge: (4000 * 60) * 10 });
                res.redirect('/profile');
            }else{
                console.log('Contraseña incorrecta');
                res.render('/register')
            }
        }        
    }, 
    logout: (req, res) =>{
        req.session.destroy();
        return res.redirect('/');
        res.clearCookie("email")

    },
    register: async (req, res) => {
        let ciudades = await db.Ciudad.findAll({paranoid: false})
        let roles = await db.Rol.findAll({paranoid: false})
        res.render('register.ejs', {ciudad: ciudades, rol: roles})
        /*await db.Ciudad.findAll({paranoid: false})
            .then(ciudad => {
                res.render('register.ejs', {ciudad})
            }) */       
    },
     
    users: async (req, res)=>{
        await db.Usuario.findAll({paranoid: false})
            .then(usuarios => {
                res.render('users.ejs', {usuarios})
            })        
    },
    profile: async (req,res)=>{        
        //let usuarioEncontrado = await db.Usuario.findByPk(req.params.id)
       
        //console.log(usuarioEncontrado); 
        //console.log(req.params.id);
        let ciudades = await db.Ciudad.findAll({paranoid: false})
        console.log(req.session);
        return res.render('profile', {ciudad: ciudades, usuario: req.session.usuarioLogueado})

    },
    profileEdit: async (req,res)=>{
        const ciudades = await db.Ciudad.findAll({ paranoid: false });
        let roles = await db.Rol.findAll({paranoid: false})
        // const usuarioEncontrado = await db.Usuario.findOne({ 
        //     where: { id: req.params.id }
        // });   
        
        res.render('profileEdit', { ciudad: ciudades, rol: roles, usuario: req.session.usuarioLogueado})
    },
    profileEditProcess: async (req, res) => {
        
        let usuarioEncontrado = await db.Usuario.update({
            ...req.body,
            imagen_perfil: req.file.filename
        },{where:{
                id: req.params.id
            }})
            console.log(usuarioEncontrado);
            res.redirect('/profile/'+ req.params.id)
        
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
    
    altaUser: async (req, res)=> {   
        const ciudades = await db.Ciudad.findAll({ paranoid: false });
        let roles = await db.Rol.findAll({paranoid: false})
        const usuarioEnDb = await db.Usuario.findOne({ 
            where: { email: req.body.email }
        });   
    
        if (usuarioEnDb){
            res.render('register',{ ciudad: ciudades, rol: roles});               
        };
        const usuarioNuevo = await db.Usuario.create({
                ...req.body,
                contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
                imagen_perfil: req.file.filename,
                roles_id :2
        })
        console.log(usuarioNuevo);
        //res.redirect('/profile/'+ usuarioNuevo.id) 
        res.redirect('/login')
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