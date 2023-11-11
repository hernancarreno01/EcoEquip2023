const { Association } = require("sequelize");
const db = require("../../database/models");

const controller = {
    list: async (req, res) => {
        let respuesta = {
            count: 0,
            countByCategory: {},
            products: [],
        };
        const [products, categories] = await Promise.all([
            db.Producto.findAll({ include: [{ association: "categoria" }] }),
            db.Categoria.findAll({ include: [{ association: "productos" }] }),
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
                detail: "/api/product/detail" + row.id,
            };
        });
        res.json(respuesta);
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

module.exports = controller