module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: dataTypes.INTEGER
        },
        nombre: {
            allowNull: false,
            type: dataTypes.STRING,
            validate: {
                len: [5, 255] // al menos 5 caracteres
            }
        },
        precio: {
            type: dataTypes.DECIMAL(10,2)
        },
        modelo: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING,
            validate: {
                len: [20, undefined] // al menos 20 caracteres
            }
        },
        categorias_id: dataTypes.INTEGER,
        imagen_01: {
            type: dataTypes.STRING,
            validate: {
                is: /\.(jpg|jpeg|png|gif)$/i // archivo válido
            }
        },
        /*categorias_id: dataTypes.INTEGER
        imagen_02: {
            type: dataTypes.STRING
        },
        imagen_03: {
            type: dataTypes.STRING
        },*/
    };
    let config = {
        tableName: 'productos',
        timestamps: false,
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.belongsTo(models.Categorias,{
            foreignKey:"categorias_id",
            as:"categoria"
        })
    }

    return Producto
}
