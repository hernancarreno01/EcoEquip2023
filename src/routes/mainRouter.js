const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        let folder = path.join(__dirname,'../../public/img')
        cb(null,folder)
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
        

    }
})
const uploadFile = multer ({ storage})



router.get("/", mainController.home);
router.get("/login", mainController.login);
router.get("/productCart", mainController.productCart);
router.get("/productDetail/:id", mainController.productDetail);
router.get("/register", mainController.register);
router.get("/header", mainController.header);
router.get("/header2", mainController.header2);
router.get("/productCreate", mainController.productCreate);
router.get("/productModify/:id", mainController.productModify);
router.get("/users", mainController.users);
router.get('/productList', mainController.productList);

router.post("/productCreate",  uploadFile.single("imagen_principal"), mainController.productCreateProcess);
router.put("/productModify/:id", uploadFile.single("archivo"), mainController.productModifyProcess);
router.delete("/productDelete/:id", mainController.productDelete);
router.put("/productAlta/:id", mainController.recuperarProcess);

router.post("/register", mainController.altaUser);

module.exports = router