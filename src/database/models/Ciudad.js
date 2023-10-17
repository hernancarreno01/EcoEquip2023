module.exports = (sequelize, dataTypes) => {
    let alias = 'Ciudad';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: dataTypes.INTEGER
        },
        nombre_ciudad: {
            type: dataTypes.STRING        
        }
    };


    let config = {
        tableName: "ciudad",
        timestamps: false,
        paranoid: true
    };

    const Ciudad = sequelize.define(alias, cols, config);
    Ciudad.associate = function(models) {
        Ciudad.hasMany(models.Usuario,{
            foreignKey:"usuarios_id",
            as:"ciudad"
        })
    }
    return Ciudad;
}
