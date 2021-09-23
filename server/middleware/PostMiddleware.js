module.exports.Xemdanhsachbaiviet = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xemdanhsachbaiviet')) return res.redirect('/403');
    return next();
}
module.exports.Thembaiviet = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Thembaiviet')) return res.redirect('/403');
    return next();
}
module.exports.Suabaiviet = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Suabaiviet')) return res.redirect('/403');
    return next();
}
module.exports.Xoabaiviet = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoabaiviet')) return res.redirect('/403');
    return next();
}
module.exports.Xoanhieubaiviet = (req, res, next) =>{
    const listRole = CurrentUser.userType.Roles.split(",");
    if(!listRole.includes('Xoanhieubaiviet')) return res.redirect('/403');
    return next();
}