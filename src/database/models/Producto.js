module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            allowNull: false,
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.DECIMAL(10,2)
        },
        modelo: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.INTEGER
        },
    };
    let config = {
        tableName: 'productos',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.belongsTo(models.Categoria,{
            foreignKey:"categorias_id",
            as:"categoria"
        })
    }

    return Producto
}