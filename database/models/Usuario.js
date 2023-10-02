module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';
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
        cliudad_id: {
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
        rol_id: {
            type: dataTypes.INTEGER
        },
        deleted: {
            type: dataTypes.DATE
        },
        creado: {
            type: dataTypes.DATE
        },
        editado: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: "ecoequip",
        timestamps: false
    };

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}
