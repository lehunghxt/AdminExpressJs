const UserTypeModel = require("../models/UserTypeModel");
exports.view = async (req, res) => {
  const listUserType = await UserTypeModel.list();
  const existData = listUserType.length > 0 ? true : false;
  const message = req.flash("message")[0];
  res.render("userType/list-user-type", {
    listUserType: listUserType,
    existData: existData,
    message: message,
    token: req.session.csrf,
  });
};
exports.store = async (req, res) => {
  const data = req.body;
  const dataAdded = await UserTypeModel.add(data);
  req.flash("message", `đã thêm loại tài khoản: ${dataAdded.typeName} !`);
  res.redirect("/user-type");
};
exports.update = async (req, res) => {
  const data = req.body;
  const { TypeId } = req.body;
  const dataUpdated = await UserTypeModel.update(data, TypeId);
  req.flash("message", `đã cập nhập loại tài khoản: ${dataUpdated.TypeName} !`);
  res.redirect("/user-type");
};
exports.delete = async (req, res) => {
  const { userTypeId } = req.body;
  const dataDel = await UserTypeModel.delete(userTypeId);
  var message;
  if (!dataDel) message = `xóa loại người dùng không thành công !`;
  else message = `đã xóa thành công loại người dùng: ${dataDel.TypeName} !`;
  req.flash("message", message);
  res.redirect("/user-type");
};
exports.deleteMul = async (req, res) => {
  const { idUserType } = req.body;
  const count = await UserTypeModel.deleteMul(idUserType);
  var message;
  if (!count || count.deletedCount == 0)
    message = `xóa thành viên không thành công !`;
  else message = `đã xóa thành công ${count.deletedCount} loại tài khoản !`;
  req.flash("message", message);
  res.redirect("/user-type");
};

exports.gen = async (req, res) => {
  const datagen = await UserTypeModel.gen();
  res.redirect("/user-type");
};
