module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: dataTypes.INTEGER
        },
        nombre_usuario: {
            allowNull: false,
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        nombres: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
        ciudad_id: {
            type: dataTypes.INTEGER
        },
        password: {
            type: dataTypes.STRING
        },
        imagen_perfil: {
            type: dataTypes.STRING
        },
        telefono: {
            type: dataTypes.STRING
        },
        roles_id: {
            type: dataTypes.INTEGER
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps: false
    };

    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate = function(models) {
        Usuario.hasMany(models.Factura,{
            foreignKey:"usuarios_id",
            as:"facturas"
        })
        Usuario.hasMany(models.Ciudad,{
            foreignKey:"usuarios_id",
            as:"ciudades"
        })
        Usuario.belongsTo(models.Rol,{
            foreignKey:"usuarios_id",
            as:"rol"
        })
    }
    return Usuario;
}
