const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require('multer');
const path = require('path');
const guestMiddelware = require( '../database/middlewares/guestMiddleware');
const authMiddelware = require( '../database/middlewares/authMiddleware');


const storage = multer.diskStorage({
    destination: async(req,file,cb)=>{
        let folder = path.join(__dirname,'../../public/img/avatars')        
        cb(null,folder)
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))       

    }
})
const uploadFile = multer ({ storage})

//Formulario de login
router.get("/login", guestMiddelware,  userController.login);
//Procesar el login
router.post("/login",  userController.loginProcess);
//logout
router.get("/logout", userController.logout);
router.get("/register", guestMiddelware, userController.register);
router.get("/users", userController.users);
router.get("/profile", authMiddelware, userController.profile);
router.get("/profileEdit/:id", userController.profileEdit);

router.post("/register",uploadFile.single("imagen_perfil"), userController.altaUser);//OK

router.put("/profileEdit/:id",uploadFile.single("imagen_perfil"), userController.profileEditProcess);
router.delete("/userDelete/:id",userController.userDelete);//OK
router.put("/userRetrieve/:id",userController.recuperarProcess )



module.exports = router