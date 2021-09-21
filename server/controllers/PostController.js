const PostModel = require("../models/PostModel");
const { userCan } = require("../../Helpers/helper");
exports.view = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  var perPage = 20;
  const listpost = await PostModel.listpost(page, perPage, CurrentUser);
  if (page > listpost.pages) return res.redirect("post");
  const existData = listpost.posts.length > 0 ? true : false;
  const message = req.flash("message")[0];
  res.render("posts/list-post", {
    listpost: listpost.posts,
    currentPage: listpost.current,
    pages: listpost.pages,
    existData: existData,
    message: message,
    token: req.session.csrf,
  });
};
exports.add = (req, res) => {
  res.render("posts/add-post");
};
exports.store = async (req, res) => {
  const data = req.body;
  data.CurrentUser = req.session.CurrentUser;
  const dataAdded = await PostModel.addpost(data);
  req.flash("message", `đã thêm bài viết: ${dataAdded.name} !`);
  res.redirect("/post");
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const postdata = await PostModel.findOnePost(id);
  res.render("posts/edit-post", { post: postdata, token: req.session.csrf });
};

exports.update = async (req, res) => {
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
  if (!dataDelete) message = `xóa bài viết không thành công !`;
  else message = `đã xóa thành công bài viết: ${dataDelete.title} !`;
  req.flash("message", message);
  res.redirect("/post");
};

exports.deleteAll = async (req, res) => {
  const { postid } = req.body;
  const count = await PostModel.deletemulpost(postid);
  var message;
  if (!count || count.deletedCount == 0)
    message = `xóa bài viết không thành công !`;
  else message = `đã xóa thành công ${count.deletedCount} bài viết !`;
  req.flash("message", message);
  res.redirect("/post");
};

exports.gen = async (req, res) => {
  const currentUser = req.session.CurrentUser;
  const datagen = await PostModel.gen(currentUser);
  res.redirect("/post");
};
