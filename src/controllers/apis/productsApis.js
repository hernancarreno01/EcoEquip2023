const { Association } = require("sequelize");
const db = require("../../database/models");

const productController = {
    list: async (req, res) => {
        try {
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
                respuesta.countByCategory[categoria.tipo] = categoria.productos.length;
            });
            respuesta.products = products.map((row) => {
                return {
                    id: row.id,
                    name: row.nombre,
                    description: row.descripcion,
                    category: row.categoria,
                    detail: "/api/products/detail/" + row.id,
                };
            });
            res.json(respuesta);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    detail: async (req, res) => {
        console.log("entro en detail");
        try {
            let producto = await db.Producto.findByPk(req.params.id, {
                include: [
                    { model: db.Categorias, as: 'categoria' }, // Relación con categorías
                ],
            });

            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            let respuesta = {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,

                categoria: producto.categoria ? producto.categoria.tipo : null,
                categoria_id: producto.categoria ? producto.categoria.id : null,
                imagen_url: '/img/productos/' + producto.imagen_01,
            };

            res.json(respuesta);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
};

module.exports = productController;
