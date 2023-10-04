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
            type: dataTypes.DATETIME
        }

    };


    let config = {
        tableName: "facturas",
        timestamps: false
    };

    const Factura = sequelize.define(alias, cols, config);

    return Factura;
}
