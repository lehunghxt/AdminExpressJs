const UserTypeModel = require("../models/UserTypeModel");
const { validationResult } = require("express-validator");

exports.view = async (req, res) => {
    try {
        const listUserType = await UserTypeModel.list();
        const existData = listUserType.length > 0 ? true : false;
        const message_success = req.flash("message_success")[0];
        const message_error = req.flash("message_error")[0];
        res.render("userType/list-user-type", {
            listUserType: listUserType,
            existData: existData,
            message_success,
            message_error,
            token: req.session.csrf,
            title: "Danh sách loại tài khoản",
        });
    } catch (error) {
        console.log(error);
    }
  
};
exports.store = async (req, res) => {
    try {
        const errors = validationResult(req);
        const listUserType = await UserTypeModel.list();
        if (!errors.isEmpty()) {
            const dataErr = errors.array();
            res.render("userType/list-user-type", {
            title: "Danh sách loại tài khoản",
            token: req.session.csrf,
            dataErr,
            userType: req.body,
            listUserType: listUserType,
            showModal : true,
            });
            return;
        }
        const data = req.body;
        const dataAdded = await UserTypeModel.add(data);
        req.flash("message_success", `Đã thêm loại tài khoản: ${dataAdded.typeName} !`);
        res.redirect("/user-type");
    } catch (error) {
        console.log(error);
    }
  
};
exports.update = async (req, res) => {
    try {
        const errors = validationResult(req);
        const listUserType = await UserTypeModel.list();
        if (!errors.isEmpty()) {
            const dataErr = errors.array();
            res.render("userType/list-user-type", {
            title: "Danh sách loại tài khoản",
            token: req.session.csrf,
            dataErr,
            userType: req.body,
            listUserType: listUserType,
            showModal : true,
            });
            return;
        }

        const data = req.body;
        const { TypeId } = req.body;
        const dataUpdated = await UserTypeModel.update(data, TypeId);
        req.flash("message_success", `Đã cập nhập loại tài khoản: ${dataUpdated.TypeName} !`);
        res.redirect("/user-type");
    } catch (error) {
        console.log(error);
    }
  
};
exports.delete = async (req, res) => {
    try {
        const { userTypeId } = req.body;
        const dataDel = await UserTypeModel.delete(userTypeId);
        if (!dataDel) 
            req.flash("message_error", `Xóa loại người dùng không thành công !`);
        else 
            req.flash("message_success", `Đã xóa thành công loại người dùng: ${dataDel.TypeName} !`);
        res.redirect("/user-type");
    } catch (error) {
        console.log(error);
    }
    
};
exports.deleteMul = async (req, res) => {
    try {
        const { idUserType } = req.body;
        const count = await UserTypeModel.deleteMul(idUserType);
        if (!count || count.deletedCount == 0)
            req.flash("message_error", `Xóa thành viên không thành công !`);
        else 
            req.flash("message_success", `Đã xóa thành công ${count.deletedCount} loại tài khoản !`);
        res.redirect("/user-type");
    } catch (error) {
        console.log(error);
    }
    
};

exports.gen = async (req, res) => {
    try {
        const datagen = await UserTypeModel.gen();
        res.redirect("/user-type");
    } catch (error) {
        console.log(error);
    }
  
};
