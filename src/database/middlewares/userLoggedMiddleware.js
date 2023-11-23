function userLoggedMiddleware(req,res,next) {
    
    res.locals.usuarioLogueado = false;

    if (req.session.usuarioLogueado){
        res.locals.usuarioLogueado = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }

    next();  
    
}

module.exports = userLoggedMiddleware;