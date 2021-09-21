const UserModel = require("../server/models/UserModel");
module.exports.CurrentUser = async (id) => {
    const data = await UserModel.find(id);
    return data;
}