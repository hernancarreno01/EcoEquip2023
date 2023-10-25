module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING        
        }
    };


    let config = {
        tableName: "roles",
        timestamps: false,
        paranoid: true
    };

    const Rol = sequelize.define(alias, cols, config);
    Rol.associate = function(models) {
        Rol.hasMany(models.Usuario,{
            foreignKey:"roles_id",
            as:"usuarios"
        })
    }
    return Rol;
}
