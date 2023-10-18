module.exports = (sequelize, dataTypes) => {
    let alias = 'Factura';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: dataTypes.INTEGER
        },
        total: {
            type: dataTypes.DECIMAL(10, 2)
        },
        numero:{
            type: dataTypes.INTEGER 
        },
        fecha:{
            type: dataTypes.DATE
        }

    };


    let config = {
        tableName: "facturas",
        timestamps: false
    };

    const Factura = sequelize.define(alias, cols, config);
    Factura.associate = function(models) {        
        Factura.belongsToMany(models.Producto,{            
            as:"productos",
            through: "factura_producto",
            foreignKey:"facturas_id",
            otherKey:"productos_id"
        })
        Factura.belongsTo(models.Usuario,{
            foreignKey:"facturas_id",
            as:"usuario"
        })
    }
    return Factura;
}
