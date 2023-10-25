module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorias'; 
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: dataTypes.INTEGER
        },
        tipo: {
            type: dataTypes.STRING
        },
        capacidad: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "categorias",
        timestamps: false,
        paranoid: true
    };

    const Categorias = sequelize.define(alias, cols, config);

    Categorias.associate = function(models) {
        Categorias.hasMany(models.Producto, {
            foreignKey: "categorias_id",
            as: "productos" //decía categorias
        });
    }

    return Categorias;
}

