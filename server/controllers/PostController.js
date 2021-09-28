const PostModel = require("../models/PostModel");
const { validationResult } = require("express-validator");
const { Posts } = require("../models/init");
exports.view = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  var perPage = 5;
  const dataSearch = req.query;
  const listpost = await PostModel.listpost(page, perPage, CurrentUser, dataSearch);
  //if (page > listpost.pages) return res.redirect("post");
  const existData = listpost.posts.length > 0 ? true : false;
  const message_success = req.flash("message_success")[0];
  const message_error = req.flash("message_error")[0];
  res.render("posts/list-post", {
    listpost: listpost.posts,
    currentPage: listpost.current,
    pages: listpost.pages,
    existData: existData,
    message_success,
    message_error,
    token: req.session.csrf,
    title: "Quản lý bài viết",
    dataSearch,
    url : req.originalUrl,
  });
};
exports.add = (req, res) => {
  res.render("posts/add-post", {
    title: "Thêm bài viết",
    token: req.session.csrf,
  });
};
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const dataErr = errors.array();
    res.render("posts/add-post", {
      title: "Thêm bài viết",
      token: req.session.csrf,
      dataErr,
      post: req.body,
    });
    return;
  }
  const data = req.body;
  data.CurrentUser = req.session.CurrentUser;
  const dataAdded = await PostModel.addpost(data);
  req.flash("message_success", `Đã thêm bài viết: ${dataAdded.name} !`);
  res.redirect("/post");
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const postdata = await PostModel.findOnePost(id);
  res.render("posts/edit-post", {
    post: postdata,
    token: req.session.csrf,
    title: "Sửa bài viết",
  });
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const dataErr = errors.array();
    res.render("posts/edit-post", {
        title: "Sửa bài viết",
        token: req.session.csrf,
        dataErr,
        post: req.body,
    });
    return;
  }
  const data = req.body;
  data.User = CurrentUser;
  const { id } = req.params;
  const dataupdate = await PostModel.updatepost(data, id);
  req.flash("message", `đã cập nhập thông tin bài viết: ${dataupdate.title} !`);
  res.redirect("/post");
};

exports.delete = async (req, res) => {
    const { delPostId } = req.body;
    const dataDelete = await PostModel.deletepost(delPostId);
    var message;
    if (!dataDelete) req.flash("message_error", 'Xóa bài viết không thành công !');
    else req.flash("message_succes", `Đã xóa thành công bài viết: ${dataDelete.title} !`);
    res.redirect("/post");
};

exports.deleteAll = async (req, res) => {
    const { postid } = req.body;
    const count = await PostModel.deletemulpost(postid);
    if (!count || count.deletedCount == 0)
        req.flash("message_error", `Xóa bài viết không thành công !`);
    else req.flash("message_success ", `Đã xóa thành công ${count.deletedCount} bài viết !`);
    res.redirect("/post");
};

exports.gen = async (req, res) => {
  const currentUser = req.session.CurrentUser;
  const datagen = await PostModel.gen(currentUser);
  res.redirect("/post");
};

exports.ajaxPost = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findOnePost(id);
  res.json({ post: post }).status(200);
};
exports.ajaxChangeStatus = async (req, res) => {
    const {id} = req.body;
    const post = await PostModel.ajaxChangeStatus(id);
    res.status(200).json({
        status : post == null ? 0 : post.status,
        message : post == null ? 'Không cập nhập được trạng thái bài viết.' : 'Đã cập nhập trạng thái bài viết.',
    });
    if(post == null)
        res.status(200).json({status : 0, message_error : 'Không cập nhập được trạng thái bài viết.'});
    else
        res.status(200).json({status : post.status, message_success :'Đã cập nhập trạng thái bài viết.' });
}

