module.exports.Xemdanhsachloaitaikhoan = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoathanhvien')) return res.redirect('/403');
    return next();
}
module.exports.Themloaitaikhoan = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoathanhvien')) return res.redirect('/403');
    return next();
}
module.exports.Sualoaitaikhoan = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoathanhvien')) return res.redirect('/403');
    return next();
}
module.exports.Xoaloaitaikhoan = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoathanhvien')) return res.redirect('/403');
    return next();
}