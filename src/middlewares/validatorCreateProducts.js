const {check} = require('express-validator')
const validatorCreate = [
    check('nombre').notEmpty().withMessage('*El nombre es un campo obligatorio').bail().isLength({min:5}).withMessage('*El nombre debe tener minimo 5 caracteres') ,
    check('descripcion').notEmpty().withMessage('*La descripción es un campo obligatorio').bail().isLength({min:20}).withMessage('*La descripcion debe tener minimo 20 caracteres') ,
    check('precio').notEmpty().withMessage('*El precio es un campo obligatorio') ,
    check('modelo').notEmpty().withMessage('*El modelo es un campo obligatorio') ,
    check('categorias_id').notEmpty().withMessage('*La categoria es obligatoria'),
   
] 
module.exports = validatorCreate