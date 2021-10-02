const RoleModel = require("../models/RoleModel");
const UserTypeModel = require("../models/UserTypeModel");
exports.view = async (req, res) => {
    try {
        const listRole = await RoleModel.getAll();
        const listUserType = await UserTypeModel.list();
        const existData = listRole.length > 0 ? true : false;
        const message_success = req.flash("message_success")[0];
        const message_error = req.flash("message_error")[0];
        res.render("rolesGroup/list", {
            listRole,
            listUserType,
            existData,
            message_success,
            message_error,
            token: req.session.csrf,
        });
    } catch (error) {
        console.log(error);
    }
  
};
exports.store = async (req, res) => {
    try {
        const data = req.body;
        const dataAdded = await UserTypeModel.addRole(data);
        req.flash("message_success", `Đã cập nhập: ${dataAdded.TypeName} !`);
        res.redirect(`/role-group#${dataAdded._id}`);
    } catch (error) {
        console.log(error);
    }
};
