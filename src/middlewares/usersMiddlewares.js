module.exports = {
    cookieCheck : (req, res, next) => {
        if(req.cookies.concesionarias){
            req.session.user = req.cookies.concesionarias
            res.locals.user = req.session.user;
        }
        next()
    },
    inSession : (req, res, next) => {
        if(req.session.user){
            res.redirect('/')
        }else{
            next()
        }
    },
    offSession : (req, res, next) => {
        if(req.session.user){
            next()
        }else{
            res.redirect('/users/login')
        }
    },
    adminCheck : (req, res, next) => {
        if(req.session.user && req.session.user.rol == 'admin'){
            next()
        }else{
            res.redirect('/')
        }
    }
}