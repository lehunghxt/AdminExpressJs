module.exports.Xemdanhsachthanhvien = (req, res, next) => {
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xemdanhsachthanhvien')) return res.redirect('/403');
    return next();
}
module.exports.Themthanhvien = (req, res, next) => {
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Themthanhvien')) return res.redirect('/403');
    return next();
}
module.exports.Suathanhvien = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Suathanhvien')) return res.redirect('/403');
    return next();
}
module.exports.Xoathanhvien = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoathanhvien')) return res.redirect('/403');
    return next();
}