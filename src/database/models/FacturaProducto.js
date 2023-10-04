module.exports = (sequelize, dataTypes) => {
    let alias = 'FacturaProducto';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: dataTypes.INTEGER
        },
        cantidad: {
            type: dataTypes.INTEGER 
        },
        precio:{
            type: dataTypes.INTEGER 
        }

    };


    let config = {
        tableName: "factura_prod",
        timestamps: false
    };

    const FacturaProducto = sequelize.define(alias, cols, config);

    return FacturaProducto;
}
