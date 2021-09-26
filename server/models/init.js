const mongoose = require("mongoose");
const { Schema } = mongoose;
//mongodb://localhost:27017/manageruser
mongoose
  .connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
const UserModel = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    address: String,
    phone: String,
    gender: String,
    userType: { type: Schema.Types.ObjectId, ref: 'UserTypes' },
    posts : [ { type: Schema.Types.ObjectId, ref: 'Posts' } ],
    status: Number,
});
const PostModel = new Schema({
    title: String,
    content: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'Users' },
    status: Number,
});
const RoleModel = new Schema({
    roleCode: String,
    roleName: String,
    roleGroup: String,
});
const UserTypeModel = new Schema({
    TypeName: String,
    TypeCode: Number,
    Roles : String,
});

const Users = mongoose.model("Users", UserModel);
const Posts = mongoose.model("Posts", PostModel);
const Roles = mongoose.model("Roles", RoleModel);
const UserTypes = mongoose.model("UserTypes", UserTypeModel);

module.exports = {
    Users,
    Posts,
    Roles,
    UserTypes,
}
