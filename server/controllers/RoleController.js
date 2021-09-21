const RoleModel = require("../models/RoleModel");
exports.view = async (req, res) => {
  const listRole = await RoleModel.getAll();
  res.render("roles/list",{
    token: req.session.csrf,
    listRole: listRole,
  });
};
exports.store = async (req, res) => {
  const data = req.body;
  const dataAdd = await RoleModel.addRole(data);
  req.flash("message", `đã thêm quyền: ${dataAdd.roleName} !`);
  res.redirect("/role");
};
exports.update = async (req, res) => {
  const data = req.body;
  const dataEdit = await RoleModel.updateRole(data);
  req.flash("message", `đã cập nhập quyền: ${dataEdit.roleName} !`);
  res.redirect("/role");
};
exports.delete = async (req, res) => {
  const data = req.body;
  const dataDelete = await RoleModel.deleteRole(data);
  req.flash("message", `đã cập nhập quyền: ${dataDelete.roleName} !`);
  res.redirect("/role");
};
