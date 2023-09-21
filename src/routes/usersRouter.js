const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        let folder = path.join(__dirname,'../../public/img/avatars')
        cb(null,folder)
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))       

    }
})
const uploadFile = multer ({ storage})


router.get("/login",  userController.login);
router.get("/register",  userController.register);
router.get("/users", userController.users);
router.get("/profile/:id", userController.profile);
router.get("/profileEdit/:id", userController.profileEdit);

router.post("/register", userController.altaUser);
router.put("/profileEdit/:id",uploadFile.single("avatar"), userController.profileEditProcess);





module.exports = router