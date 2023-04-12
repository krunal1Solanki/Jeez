const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        console.log('goin ahead')
        return next();
    } 
    console.log('noot goin ahead')

    return res.status(401).send({
        message : 'please login first',
    })
}

module.exports = {isAuth}