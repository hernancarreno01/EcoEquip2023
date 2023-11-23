const {check} = require('express-validator')
const fs = require('fs')

const validations = [
    check('imagen_01').custom((value, {req})=>{
        let file = req.file;
        if(file){
            if(req.fileError){
                throw new Error ('Adjunte una imagen con formato valido')
            }
            else if (file.size > 1024*1024*10){
                fs.unlinkSync(file.path)
                throw new Error ('*La imagen debe pesar menos de 10Mb')
            }
            return true
        }else {throw new Error ('* El producto debe tener una imagen')}
        
    })
]

module.exports = validations