const express = require('express');
const router = express.Router();
const controller = require('../../controllers/apis/productsApis');


router.get("/", controller.list);
router.get("/:id", controller.detail);
router.get("/products/:id", controller.detail2);


module.exports = router;