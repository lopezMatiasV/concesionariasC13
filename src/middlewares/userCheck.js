/* EJEMPLO DE MIDDLEWARES */
module.exports = (req, res, next) => {
    let user = req.body.admin;
    if(user == 'matias'){
        next()
    }else{
        res.redirect('/users/register')
    }
}