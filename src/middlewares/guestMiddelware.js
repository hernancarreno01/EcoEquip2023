function guestMiddelware (req, res, next) {
    if (req.session.usuarioLogueado){
        let usuario =  req.session.usuarioLogueado
        return res.redirect('/profile/'+ usuario.id)
    }
    next()
}
module.exports = guestMiddelware