const RoleModel = require("../models/RoleModel");
const { validationResult } = require("express-validator");

exports.view = async (req, res) => {
  const listRole = await RoleModel.getAll();
  res.render("roles/list-role",{
    token: req.session.csrf,
    listRole,
    title : 'Quản lý quyền',
  });
};
exports.store = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const listRole = await RoleModel.getAll();
    const dataErr = errors.array();
    res.render("roles/list-role",{
        title : 'Quản lý quyền',
        token: req.session.csrf,
        dataErr,
        listRole,
        role : req.body,
    });
    return;
  }

  const data = req.body;
  const dataAdd = await RoleModel.addRole(data);
  //req.flash("message_success", `Đã thêm quyền: ${dataAdd.roleName} !`);
  res.redirect("/role");
};
exports.update = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const listRole = await RoleModel.getAll();
    const dataErr = errors.array();
    res.render("roles/list-role",{
        title : 'Quản lý quyền',
        token: req.session.csrf,
        dataErr,
        listRole,
        roleEdit : req.body,
        showModal : true,
    });
    return;
  }

  const data = req.body;
  const dataEdit = await RoleModel.updateRole(data);
  //req.flash("message", `Đã cập nhập quyền: ${dataEdit.roleName} !`);
  res.redirect("/role");
};
exports.delete = async (req, res) => {
  const data = req.body;
  const dataDelete = await RoleModel.deleteRole(data);
  //req.flash("message", `Đã cập nhập quyền: ${dataDelete.roleName} !`);
  res.redirect("/role");
};
