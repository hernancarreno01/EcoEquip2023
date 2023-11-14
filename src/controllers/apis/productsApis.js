const { Association } = require("sequelize");
const db = require("../../database/models");

/**
 * Product API controller.
 *
 * Exports API endpoints for listing and retrieving product data.
 */
const controller = {
    list: async (req, res) => {
        let respuesta = {
            count: 0,
            countByCategory: {},
            products: [],
        };
        const [products, categories] = await Promise.all([
            db.Producto.findAll({ include: [{ association: "categoria" }] }),
            db.Categorias.findAll({ include: [{ association: "productos" }] }),
        ]);
        respuesta.count = products.length;
        categories.forEach((categoria) => {
            respuesta.countByCategory[categoria.tipo] = {
                count: categoria.productos.length,
                products: categoria.productos.map((producto) => ({
                    id: producto.id,
                    name: producto.nombre,
                    description: producto.descripcion,
                    category: producto.categoria,
                    detail: "/api/products/detail" + producto.id,
                })),
            };
        });
        respuesta.products = products.map((row) => {
            return {
                id: row.id,
                name: row.nombre,
                description: row.descripcion,
                category: row.categoria,
                detail: "/api/products/detail" + row.id,
            };
        });
        res.json(respuesta);
    },

    detail2: async (req, res) => {
        const product = await db.Product.findByPk(req.params.id);
    
        res.json(product);
    }, 

    detail: async (req, res) => {
        let producto = await db.Producto.findByPk(req.params.id);
        let respuesta = {
            ...producto,
            id: producto.id,
            name: producto.precio,
            price: producto.precio,
            model: producto.modelo,
            description: producto.descripcion,
            category: producto.categorias_id,
            url_imagen: '/img/productos/' + producto.imagen_01,
        };
        res.json(respuesta);
    },
};

module.exports = controller;
