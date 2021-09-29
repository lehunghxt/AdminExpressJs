const UserModel = require("../models/UserModel");
const fs = require('fs');
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
            message_error : 'Tài khoản của bạn tạm thời bị khóa !'
        });
    }else{
        res.render('auth/login', {
            layout : false, 
            token: req.session.csrf,
            username : username,
            password : password,
            message_error : 'Tên đăng hoặc mật khẩu không đúng !'
        });
    }
};
exports.logout = async(req, res) => {
    req.session.destroy();
    console.log('Đăng xuất thành công.');
    res.redirect('/login');
}
exports.profile = async(req, res) => {
    const userId = req.session.CurrentUser._id;
    const info = await UserModel.find(userId);
    const message_success = req.flash("message_success")[0];
    const message_error = req.flash("message_error")[0];
    res.render('profile',{
        info,
        message_success,
        message_error,
    });
}
exports.updateProfile = async (req, res) => {
    if(req.fileValidationError){
        req.flash("message_error", `Vui lòng chọn đúng định dạng hình ảnh !`);
        res.redirect('/profile');
        return;
    }
    const data = req.body;
    data.image = req.file ? req.file.filename : '';
    const userId = req.session.CurrentUser._id;
    const info = await UserModel.updateProfile(data, userId);
    const oldImg = req.session.CurrentUser.image;
    if(info){
        const dir = `./public/uploads/${userId}/${oldImg}`;
        if(req.file && fs.existsSync(dir))
            fs.unlinkSync(dir);
        req.flash("message_success", `Cập nhập thành công !`);
        res.redirect('/profile')
    }else{
        fs.unlinkSync(req.file.path);
    }
}
