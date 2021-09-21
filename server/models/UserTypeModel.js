const { UserTypes } = require("../models/init");
module.exports.list = async () => {
  return new Promise((res, rej) => {
    UserTypes.find({})
      .lean()
      .exec(function (error, userTypes) {
        if (error) rej(error);
        res(userTypes);
      });
  });
};
module.exports.add = async (data) => {
  return new Promise(async (res, rej) => {
    const userType = new UserTypes({
      TypeName: data.TypeName,
      TypeCode: data.TypeCode,
    });
    userType
      .save()
      .then((result) => {
        res(result);
      })
      .catch((err) => {
        rej(err);
      });
  });
};
module.exports.addRole = async (data) => {
  return new Promise((res, rej) => {
    const id = data.userTypeId;
    const userType = {
      Roles: data.roles.toString(),
    };
    UserTypes.findByIdAndUpdate({ _id: id }, userType, function (err, model) {
      if (err) rej(err);
      res(model);
    });
  });
};

module.exports.update = async (data, id) => {
  return new Promise((res, rej) => {
    const userType = {
      TypeName: data.TypeName,
      TypeCode: parseInt(data.TypeCode),
    };
    UserTypes.findByIdAndUpdate({ _id: id }, userType, function (err, model) {
      if (err) rej(err);
      res(model);
    });
  });
};
module.exports.delete = async (id) => {
  return new Promise((res, rej) => {
    UserTypes.findByIdAndRemove({ _id: id }, function (err, docs) {
      if (err) {
        rej(false);
      } else {
        res(docs);
      }
    });
  });
};

module.exports.deleteMul = async (ids) => {
  return new Promise((res, rej) => {
    UserTypes.deleteMany({ _id: { $in: ids } }, function (err, datas) {
      if (err) {
        console.log(err);
        //rej(err);
      } else {
        res(datas);
      }
    });
  });
};

module.exports.gen = async () => {
  const TYPE_ADMIN = 1;
  return new Promise(async (res, rej) => {
    const userType1 = new UserTypes({
      TypeName: "Admin",
      TypeCode: 1,
    });
    userType1.save();

    const userType2 = new UserTypes({
      TypeName: "User",
      TypeCode: 2,
    });
    userType2.save();

    const userType3 = new UserTypes({
      TypeName: "Viewer",
      TypeCode: 3,
    });
    userType3.save();
    res(true);
  });
};
