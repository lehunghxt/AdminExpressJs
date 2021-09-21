const { Roles } = require("./init");
const { removeVietnameseTones } = require("../../Helpers/helper");
module.exports.getAll = async (data) => {
  return new Promise(async (res, rej) => {
    const listRole = await Roles.find({}).lean();
    const listRoleGroup = [
      ...new Set(listRole.reduce((a, c) => [...a, c.roleGroup], [])),
    ];
    var listRes = [];
    listRoleGroup.forEach((item) => {
      const roleInGroup = listRole.filter((e) => e.roleGroup == item);
      listRes.push({ roleGroup: item, roles: roleInGroup });
    });
    res(listRes);
  });
};
module.exports.addRole = async (data) => {
  var roleCode = removeVietnameseTones(data.roleName);
  return new Promise((res, rej) => {
    const role = new Roles({
      roleGroup: data.roleGroup,
      roleName: data.roleName,
      roleCode: roleCode.replaceAll(" ", ""),
    });
    role
      .save()
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};
module.exports.updateRole = async (data) => {
  var roleCode = removeVietnameseTones(data.editName);
  return new Promise((res, rej) => {
    const role = {
      roleName: data.editName,
      roleCode: roleCode.replaceAll(" ", ""),
    };
    Roles.findByIdAndUpdate({ _id: data.roleId }, role, function (err, data) {
      if (err) rej(err);
      res(data);
    });
  });
};

module.exports.deleteRole = async (data) => {
  return new Promise((res, rej) => {
    Roles.findByIdAndDelete({ _id: data.roleIdDel }, function (err, data) {
      if (err) rej(err);
      res(data);
    });
  });
};
