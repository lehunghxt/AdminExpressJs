const { Posts, Users } = require("../models/init");
const bcrypt = require("bcrypt");
const { model } = require("mongoose");

module.exports.addpost = async (data) => {
  return new Promise(async (res, rej) => {
    const post = new Posts({
      title: data.title,
      content: data.content,
      description: data.description,
      author: data.CurrentUser._id,
    });
    await post.save();
    const id = data.CurrentUser._id;
    const userById = await Users.findById(id);
    userById.posts.push(post);
    await userById.save();
    res(userById);
  });
};

module.exports.listpost = async (page, perPage, CurrentUser) => {
  return new Promise((res, rej) => {
    Posts.find({ author: CurrentUser._id })
      .populate("author")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .lean()
      .exec(function (error, posts) {
        Posts.countDocuments({ author: CurrentUser._id }, (err, count) => {
          if (err) rej(err);
          res({
            posts,
            current: page, // page hiện tại
            pages: Math.ceil(count / perPage), // tổng số các page
          });
        });
      });
  });
};

module.exports.findOnePost = async (id) => {
  return new Promise((res, rej) => {
    Posts.findOne({ _id: id })
      .lean()
      .exec(function (error, post) {
        if (error) rej(error);
        res(post);
      });
  });
};
module.exports.findByTitle = async (title) => {
  return new Promise((res, rej) => {
    Posts.findOne({ title: title })
      .lean()
      .exec(function (error, post) {
        if (error) rej(error);
        res(post);
      });
  });
};

module.exports.updatepost = async (data, id) => {
  return new Promise((res, rej) => {
    const updatepost = {
      title: data.title,
      content: data.content,
      description: data.description,
      userId: data.User._id,
    };
    Posts.findByIdAndUpdate({ _id: id }, updatepost, function (err, data) {
      if (err) rej(err);
      res(data);
    });
  });
};

module.exports.deletepost = async (id) => {
  return new Promise((res, rej) => {
    Posts.findByIdAndRemove({ _id: id }, function (err, data) {
      if (err) {
        rej(false);
      } else {
        res(data);
      }
    });
  });
};
module.exports.deletemulpost = async (ids) => {
  return new Promise((res, rej) => {
    Posts.deleteMany({ _id: { $in: ids } }, function (err, posts) {
      if (err) {
        console.log(err);
        //rej(err);
      } else {
        res(posts);
      }
    });
  });
};

module.exports.gen = async (currentUser) => {
  return new Promise(async (res, rej) => {
    var posts = [];
    const listUser = await Users.find().lean();
    listUser.forEach(async function (user) {
      const id = user._id;
      const userById = await Users.findById(id);
      for (var i = 1; i <= 10; i++) {
        const post = new Posts({
          title: `Tiêu đề ${i}`,
          content: `Nội dung ${i}`,
          description: `Mô tả ${i}`,
          author: id,
        });
        await post.save();
        userById.posts.push(post);
      }
      await userById.save();
    });
    res(true);
  });
};
module.exports.ajaxChangeStatus = async (id) => {
    return new Promise( async (res, rej) => {
        const post = await Posts.findOne({_id : id});
        if(post != null){
            const SHOW = 1;
            const HIDE = 2;
            const currentStatus = post.status;
            await Posts.findByIdAndUpdate({_id : id},{
                status : (currentStatus == SHOW) ? HIDE : SHOW,
            }).then(data => res(data)).catch(err => {
                console.log(err);
                res(null);
            })
        }else{
            res(null);
        }
    })
}