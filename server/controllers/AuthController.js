const UserModel = require("../models/UserModel");
exports.showlogin = async (req, res) => {
    res.render('auth/login', {
        layout : false,
        token: req.session.csrf,
    });
};
exports.showregister = async (req, res) => {
    res.render('auth/register', {layout : false, token: req.session.csrf});
};
exports.login = async (req, res) => {
    const {username, password} = req.body;
    var datalogin = await UserModel.login(username, password);
    const STATUS_ACTIVE = 1;
    const STATUS_UNACTIVE = 2;
    if(datalogin && datalogin.status == STATUS_ACTIVE){
            datalogin.password = null;
            datalogin.posts = null;
            req.session.CurrentUser = datalogin;
            res.redirect('/');
    }else if(datalogin && datalogin.status == STATUS_UNACTIVE){
        res.render('auth/login', {
            layout : false, 
            token: req.session.csrf,
            username : username,
            password : password,
            message : 'Tài khoản của bạn tạm thời bị khóa !'
        });
    }else{
        res.render('auth/login', {
            layout : false, 
            token: req.session.csrf,
            username : username,
            password : password,
            message : 'Tên đăng hoặc mật khẩu không đúng !'
        });
    }
};
