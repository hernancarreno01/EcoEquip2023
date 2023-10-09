module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
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
        timestamps: false
    };

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models) {
        Categoria.hasMany(models.Producto,{
            foreignKey:"categorias_id",
            as:"productos"
        })
    }
    return Categoria;
}