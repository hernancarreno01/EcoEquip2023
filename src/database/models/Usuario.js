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
        ciudad_id: dataTypes.INTEGER,
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
        timestamps: true,//estaba en true y lo cambié porque daba error 1054:Unknown column 'createdAt' in 'field list'
        paranoid: true,
        deletedAt: 'borrado_el',
        createdAt: 'creado_el',
        updatedAt: 'editado_el'

    };

    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate = function(models) {
        Usuario.hasMany(models.Factura,{
            foreignKey:"facturas_id",
            as:"facturas"
        })
        Usuario.belongsTo(models.Ciudad,{
            foreignKey:"ciudad_id",
            as:"ciudades"
        })
        Usuario.belongsTo(models.Rol,{
            foreignKey:"roles_id",
            as:"rol"
        })
    }
    return Usuario;
}
