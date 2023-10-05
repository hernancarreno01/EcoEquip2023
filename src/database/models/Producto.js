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
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        modelo:{
            type: dataTypes.STRING
        },
        precio:{
            type: dataTypes.DECIMAL(10,2)
        },
        imagen_01: {
            type: dataTypes.STRING
        },
        imagen_02: {
            type: dataTypes.STRING
        },
        imagen_03: {
            type: dataTypes.STRING
        },        
        /*creado_el: {
            type: dataTypes.DATE
        },
        editado_el: {
            type: dataTypes.DATE
        },
        borrado_el:{ //en el der faltaría este
            type: dataTypes.DATE
        }*/
    };

    let config = {
        tableName: "productos",
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);
    
    Producto.associate = function(models) {
        Producto.belongsTo(models.Categoria,{
            foreignKey:"categorias_id",
            as:"categoria"
        })
        Producto.belongsToMany(models.Factura,{            
            as:"facturas",
            throught: "factura_producto",
            foreignKey:"productos_id",
            otherKey:"facturas_id"
        })
        
    }

    return Producto;
}
