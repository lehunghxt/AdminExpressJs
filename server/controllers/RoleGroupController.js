const RoleModel = require("../models/RoleModel");
const UserTypeModel = require("../models/UserTypeModel");
exports.view = async (req, res) => {
  const listRole = await RoleModel.getAll();
  const listUserType = await UserTypeModel.list();
  const existData = listRole.length > 0 ? true : false;
  const message = req.flash("message")[0];
  res.render("rolesGroup/list", {
    listRole,
    listUserType,
    existData,
    message,
    token: req.session.csrf,
  });
};
exports.store = async (req, res) => {
  const data = req.body;
  const dataAdded = await UserTypeModel.addRole(data);
  req.flash("message", `đã cập nhập: ${dataAdded.TypeName} !`);
  res.redirect(`/role-group#${dataAdded._id}`);
};
