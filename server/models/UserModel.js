const { Users, Posts } = require("../models/init");
const bcrypt = require("bcrypt");
//#region LIST
  module.exports.list = async (page, perPage, currentUserId = null, dataSearch) => {
      console.log(dataSearch);
    return new Promise(async(res, rej) => {
        const query = Users.find({ _id: {$ne: currentUserId}});
        if(dataSearch.name && dataSearch.name != ''){
            query.where('name').equals(dataSearch.name);
        }
        if(dataSearch.userType && dataSearch.userType != ''){
            query.where('userType').equals(dataSearch.userType);
        }
        if(dataSearch.status && dataSearch.status != ''){
            query.where('status').equals(dataSearch.status);
        }
        query.populate('posts').populate('userType').skip(perPage * page - perPage).limit(perPage).lean()
        query.exec(function (error, users) {
            const queryCount = Users.find({ _id: {$ne: currentUserId}});
            if(dataSearch.name && dataSearch.name != ''){
                queryCount.where('name').equals(dataSearch.name);
            }
            if(dataSearch.userType && dataSearch.userType != ''){
                queryCount.where('userType').equals(dataSearch.userType);
            }
            if(dataSearch.status && dataSearch.status != ''){
                queryCount.where('status').equals(dataSearch.status);
            }
            queryCount.countDocuments((err, count) => {
                if (err) rej(err);
                res({
                    users,
                    current: page, // page hiện tại
                    pages: Math.ceil(count / perPage), // tổng số các page
                });
            });
        });



    //   Users.find({ _id: {$ne: currentUserId}})
    //     .select("-password")
    //     .populate('posts')
    //     .populate('userType')
    //     .skip(perPage * page - perPage)
    //     .limit(perPage)
    //     .lean()
    //     .exec(function (error, users) {
    //       Users.countDocuments((err, count) => {
    //         if (err) rej(err);
    //         res({
    //           users,
    //           current: page, // page hiện tại
    //           pages: Math.ceil(count / perPage), // tổng số các page
    //         });
    //       });
    //     });

    });
  };
//#endregion

module.exports.add = async (data) => {
  var salt = await bcrypt.genSalt(10);
  return new Promise(async (res, rej) => {
    const newUser = new Users({
      name: data.name,
      email: data.email,
      username: data.username,
      password: await bcrypt.hash(data.password, salt),
      address: data.address,
      phone: data.phone,
      gender: data.gender,
      userType: data.userType,
      status : data.status ? 1 : 2,
    });
    newUser
      .save()
      .then((result) => {
        res(result);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

module.exports.find = async (id) => {
  return new Promise((res, rej) => {
    Users.findOne({ _id: id })
      .populate('posts')
      .populate('userType')
      .lean()
      .exec(function (error, body) {
        if (error) rej(error);
        res(body);
      });
  });
};

module.exports.update = async (data, id) => {
  return new Promise(async (res, rej) => {
    var salt = await bcrypt.genSalt(10);
    const updateuser = {
        name: data.name,
        email: data.email,
        username: data.username,
        //password: await bcrypt.hash(data.password, salt),
        address: data.address,
        phone: data.phone,
        gender: data.gender,
        userType: data.userType,
        status : data.status ? 1 : 2,
    };
    if (data.password)
      updateuser.password = await bcrypt.hash(data.password, salt);
    Users.findByIdAndUpdate({ _id: id }, updateuser, function (err, model) {
      if (err) rej(err);
      res(model);
    });
  });
};
module.exports.delete = async (id) => {
  return new Promise((res, rej) => {
    Users.findByIdAndRemove({ _id: id }, function (err, docs) {
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
    Users.deleteMany({ _id: { $in: ids } }, function (err, users) {
      if (err) {
        console.log(err);
        //rej(err);
      } else {
        res(users);
      }
    });
  });
};

module.exports.login = async (username, password) => {
  return new Promise((res, rej) => {
      Users.findOne({ username: username })
      .populate('userType')
      .then( async (user) => {
            if (user) {
              const validPassword = await bcrypt.compare( password, user.password);
              if (validPassword) {
                res(user);
              } else {
                res(null);
              }
            } else {
              res(null);
            }
      }).catch((err) => {
        console.log(err);
      })
  });
};
module.exports.gen = async () => {
  const TYPE_ADMIN = 1;
  return new Promise(async (res, rej) => {
    for (var i = 1; i <= 10; i++) {
      var salt = await bcrypt.genSalt(10);
      var newUser = new Users({
        name: `Lê Hùng ${i}`,
        email: `hung${i}@gmail.com`,
        username: `hungadmin${i}`,
        password: await bcrypt.hash("123456", salt),
        address: `Hàm Cường ${i}`,
        phone: "092123123",
        gender: "male",
        userType: TYPE_ADMIN,
      });
      newUser.save();
    }
    res(true);
  });
};

module.exports.findByUsername = async (username) => {
    return new Promise(async (res, rej) => {
        await Users.findOne({username : username}).then(data => res(data)).catch(err => {
            console.log(err);
            res(null);
        })
    });
  };
  module.exports.findByEmail = async (email) => {
    return new Promise(async (res, rej) => {
        await Users.findOne({email : email}).then(data => res(data)).catch(err => {
            console.log(err);
            res(null);
        })
    });
  };
  module.exports.addStatus = async () => {
    return new Promise(async (res, rej) => {
        const allUser = await Users.find({});
        console.log(allUser);
        // allUser.forEach(async user => {
        //     console.log(user._id);
        //     const status = {
        //         status : 1,
        //     }
        //     await Users.findByIdAndUpdate({_id:user._id}, status);
        // })
    });
  };
  module.exports.ajaxChangeStatus = async (id) => {
    return new Promise( async (res, rej) => {
        const user = await Users.findOne({_id : id});
        if(user == null) res(null);
        else{
            const currentStatus = user.status;
            await Users.findByIdAndUpdate({_id : id}, {
                status : currentStatus == 1 ? 2 : 1,
            }).then(data => res(data)).catch(err => {
                console.log(err);
                res(null);
            })
        }
    })
  }
  