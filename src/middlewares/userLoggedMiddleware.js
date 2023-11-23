const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let userFromCookies;

    // Verificación de cookies antes de acceder a 'email'
    if (req.cookies && req.cookies.email) {
        userFromCookies = await db.Usuario.findOne({ where: { email: req.cookies.email } });
        console.log('User found in cookies');
    } else {
        userFromCookies = await db.Usuario.findOne({ where: { email: 'notuserfound' } });
        console.log('No user found in cookies');
    }

    if (userFromCookies) {
        req.session.usuarioLogueado = userFromCookies;
    }

    if (req.session.usuarioLogueado) {
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }

    next();
}

module.exports = userLoggedMiddleware;
