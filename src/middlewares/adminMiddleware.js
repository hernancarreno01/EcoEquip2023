function adminMiddleware (req, res, next) {
    if (req.session.usuarioLogueado.roles_id != 1){
        return res.redirect('/')
    }
   
    next()
}

module.exports = adminMiddleware