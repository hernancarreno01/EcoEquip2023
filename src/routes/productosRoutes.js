const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, '../../public/img/productos')
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))

  }
})

const uploadFile = multer ({ storage })

router.get("/productosCreate",  productosController.productosCreate);  // DONE
router.get("/productosList", productosController.productosList); // DONE
router.get("/productosDetail/:id", productosController.productosDetail); // DONE
router.get("/productosEdit/:id", productosController.productosEdit); // DONE

router.put("/recuperarProducto/:id",productosController.recuperarProducto);  // DONE
router.put("/productosEdit/:id",uploadFile.single("archivo"), productosController.productosEditProcess);
router.post("/agregarProducto",uploadFile.single("imagen_01"), productosController.altaProducto);
router.delete("/productosDelete/:id",productosController.productosDelete);

module.exports = router;