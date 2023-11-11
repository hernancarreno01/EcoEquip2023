const db = require("../../database/models");

const controller = {
  list: async (req, res) => {
    let respuesta = {
      count: 0,
      users: [],
    };
    let users = await db.Usuario.findAll();
    respuesta.count = users.length;
    respuesta.users = users.map((row) => {
      return {
        id: row.id,
        name: row.apellido + " " + row.nombres,
        email: row.email,
        detail: "/api/user/detail/" + row.id,
      };
    });
    res.json(respuesta);
  },
  detail: async (req, res) => {
    let user = await db.Usuario.findByPk(req.params.id, {
      attributes: {
        exclude: ["roles_id", "contrasenia"],
      },
    });
      let respuesta = {
          ...user,
          url_imagen: '/img/avatars/' + user.imagen_perfil,
    };
    res.json(respuesta);
  },
};
module.exports = controller;
