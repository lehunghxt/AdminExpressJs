const UserModel = require("../models/UserModel");
const UserTypeModel = require("../models/UserTypeModel");
const { validationResult } = require("express-validator");
const { Users } = require("../models/init");

exports.view = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  var perPage = 12;
  const currentUserId = req.session.CurrentUser._id;
  const dataSearch = req.query;
  const listuser = await UserModel.list(page, perPage, currentUserId, dataSearch);
  //if (page > listuser.pages) return res.redirect("/user");
  const existData = listuser.users.length > 0 ? true : false;
  const message = req.flash("message")[0];
  const listUserType = await UserTypeModel.list();
  const url = req.originalUrl;
  res.render("users/list-user", {
    listuser: listuser.users,
    currentPage: listuser.current,
    pages: listuser.pages,
    existData: existData,
    message: message,
    token: req.session.csrf,
    listUserType,
    url,
    dataSearch,
  });
};
exports.add = async (req, res) => {
    const listUserType = await UserTypeModel.list();
    res.render("users/add-user", {
        title: "Thêm thành viên",
        listUserType,
        token: req.session.csrf,
    });
};
exports.store = async (req, res) => {
    const errors = validationResult(req);
    const listUserType = await UserTypeModel.list();
    if (!errors.isEmpty()) {
        const dataErr = errors.array();
        res.render("users/add-user", {
            title: "Thêm thành viên",
            token: req.session.csrf,
            dataErr,
            user: req.body,
            listUserType,
        });
        return;
    }
    const data = req.body;
    const dataAdded = await UserModel.add(data);
    req.flash("message", `đã thêm người dùng: ${dataAdded.name} !`);
    res.redirect("/user");
};
exports.edit = async (req, res) => {
    const { id } = req.params;
    const userdata = await UserModel.find(id);
    const listUserType = await UserTypeModel.list();
    res.render("users/edit-user", {
        title: "Cập nhập thành viên",
        user: userdata,
        token: req.session.csrf,
        listUserType,
    });
};
exports.update = async (req, res) => {
    const errors = validationResult(req);
    const listUserType = await UserTypeModel.list();
    if (!errors.isEmpty()) {
        const dataErr = errors.array();
        res.render("users/edit-user", {
        title: "Cập nhập thành viên",
        token: req.session.csrf,
        dataErr,
        user: req.body,
        listUserType: listUserType,
        });
        return;
    }
    const data = req.body;
    const { id } = req.params;
    const dataupdate = await UserModel.update(data, id);
    req.flash("message", `đã cập nhập thông tin người dùng: ${data.name} !`);
    res.redirect("/user");
};
exports.delete = async (req, res) => {
    const { userid } = req.body;
    const datadelete = await UserModel.delete(userid);
    var message;
    if (!datadelete) message = `xóa người dùng không thành công !`;
    else message = `đã xóa thành công người dùng: ${datadelete.name} !`;
    req.flash("message", message);
    res.redirect("/user");
};
exports.deleteMul = async (req, res) => {
    const { userId } = req.body;
    const count = await UserModel.deleteMul(userId);
    var message;
    if (!count || count.deletedCount == 0)
        message = `xóa thành viên không thành công !`;
    else message = `đã xóa thành công ${count.deletedCount} thành viên !`;
    req.flash("message", message);
    res.redirect("/user");
};
exports.gen = async (req, res) => {
    const datagen = await UserModel.gen();
    res.redirect("/user");
};
exports.addStatus = async (req, res) => {
    const datagen = await UserModel.addStatus();
    res.redirect("/user");
};
exports.ajaxChangeStatus = async (req, res) => {
    const {id} = req.body;
    const data = await UserModel.ajaxChangeStatus(id);
    res.status(200).json({
        status : data == null ? 0 : data.status,
        message : data == null ? 'Không cập nhập được trạng thái.' : 'Đã cập nhập được trạng thái.'
    })
}
exports.listjson = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    var perPage = 6;
    const currentUserId = req.session.CurrentUser._id;
    const dataSearch = req.query;
    const listuser = await UserModel.list(page, perPage, currentUserId, dataSearch);
    if (page > listuser.pages) return res.redirect("/user");
    res.status(200).json({
        listuser: listuser.users,
        currentPage: listuser.current,
        pages: listuser.pages,
    });
}

