//Xem danh sách quyền
module.exports.Xemdanhsachquyen = (req, res, next) => {
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xemdanhsachquyen')) return res.redirect('/403');
    return next();
}
//Thêm quyền
module.exports.Themquyen = (req, res, next) => {
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Themquyen')) return res.redirect('/403');
    return next();
}
//Sửa quyền
module.exports.Suaquyen = (req, res, next) => {
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Suaquyen')) return res.redirect('/403');
    return next();
}
//Xóa quyền
module.exports.Xoaquyen = (req, res, next) => {
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoaquyen')) return res.redirect('/403');
    return next();
}