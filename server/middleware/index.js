module.exports.checkCsrfToken = (req, res, next) => {
    if(!req.body.csrf || req.body.csrf != req.session.csrf) return res.redirect('/403');
    return next();
}
module.exports.isLogged = (req, res, next) => {
    if(!req.session.CurrentUser) {
        res.render('auth/login', {
            layout : false,
            token: req.session.csrf,
            message: req.originalUrl == '/' ? '' : 'vui lòng đăng nhập để tiếp tục',
          });
    }else{
        next();
    }
}
