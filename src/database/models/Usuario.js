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
        contrasenia: {
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
        creado_el: {
            type: dataTypes.DATE
        },
        editado_el: {
            type: dataTypes.DATE
        },
        borrado_el: {
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
            foreignKey:"id",
            as:"facturas"
        })
        Usuario.hasMany(models.Ciudad,{
            foreignKey:"id",
            as:"ciudades"
        })
        Usuario.belongsTo(models.Rol,{
            foreignKey:"id",
            as:"rol"
        })
    }
    return Usuario;
}
