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
  if(datalogin){
    datalogin.password = null;
    datalogin.posts = null;
    req.session.CurrentUser = datalogin;
    res.redirect('/');
  }
  res.render('auth/login', {
    layout : false, 
    token: req.session.csrf,
    username : username,
    password : password,
    message : 'tài khoản hoặc mật khẩu không đúng'
  });
};
