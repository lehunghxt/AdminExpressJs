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
  const message_success = req.flash("message_success")[0];
  const message_error = req.flash("message_error")[0];
  const listUserType = await UserTypeModel.list();
  const url = req.originalUrl;
  res.render("users/list-user", {
    listuser: listuser.users,
    currentPage: listuser.current,
    pages: listuser.pages,
    existData: existData,
    message_success,
    message_error,
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
    req.flash("message_success", `Đã thêm người dùng: ${dataAdded.name} !`);
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
    req.flash("message_success", `Đã cập nhập thông tin người dùng: ${data.name} !`);
    res.redirect("/user");
};
exports.delete = async (req, res) => {
    const { userid } = req.body;
    const datadelete = await UserModel.delete(userid);
    var message;
    if (!datadelete) 
        req.flash("message_error", `Xóa người dùng không thành công !`);
    else 
        req.flash("message_success", `Đã xóa thành công người dùng: ${datadelete.name} !`);
    res.redirect("/user");
};
exports.deleteMul = async (req, res) => {
    const { userId } = req.body;
    const count = await UserModel.deleteMul(userId);
    if (!count || count.deletedCount == 0)
        req.flash("message_error", `Xóa thành viên không thành công !`);
    else 
        req.flash("message_success", `đã xóa thành công ${count.deletedCount} thành viên !`);
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
    if(data == null){
        res.status(200).json({status :0, message_error :'Không cập nhập được trạng thái.'})
    }else{
        res.status(200).json({ status : data.status, message_success :'Đã cập nhập được trạng thái.' })
    }
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

