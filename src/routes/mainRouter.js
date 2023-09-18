const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController')
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

router.get("/header", mainController.header);
router.get("/header2", mainController.header2);
router.get("/productCreate", productController.productCreate);
router.get("/productCart", productController.productCart);
router.get("/productDetail/:id", productController.productDetail);
router.get("/productModify/:id", productController.productModify);
router.get('/productList', productController.productList);

router.post("/productCreate",  uploadFile.single("imagen_principal"), productController.productCreateProcess);
router.put("/productModify/:id", uploadFile.single("archivo"), productController.productModifyProcess);
router.delete("/productDelete/:id", productController.productDelete);
router.put("/productAlta/:id", productController.recuperarProcess);



module.exports = router