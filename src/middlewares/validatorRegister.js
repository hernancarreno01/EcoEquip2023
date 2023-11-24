const {check} = require('express-validator')
console.log("pasó por validator");
const validatorRegister = [
    check('nombre_usuario').notEmpty().withMessage('*El nombre de usuario es un campo obligatorio') ,
    check('apellido').notEmpty().withMessage('*El apellido es un campo obligatorio') ,
    check('nombres').notEmpty().withMessage('*El nombre de usuario es un campo obligatorio'),
    check('direccion').notEmpty().withMessage('*El domicilio es un campo obligatorio') ,
    check('email').notEmpty().withMessage('*El email es un campo obligatorio').bail().isEmail().withMessage('*Email con formato invalido') ,
    check('descripcion').notEmpty().withMessage('*La password es un campo obligatorio').bail().isLength({min:8,max:20}).withMessage('*La password debe tener minimo 8 caracteres') ,
    
  ]
module.exports = validatorRegister