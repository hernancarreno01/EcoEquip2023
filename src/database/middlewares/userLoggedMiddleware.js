function userLoggedMiddleware(req,res,next) {
    
    res.locals.estalogueado = false;

    next();  
    
}

module.exports = userLoggedMiddleware;