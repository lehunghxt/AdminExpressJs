const express = require("express");
const userRoute = express.Router();
const UserController = require("../controllers/UserController");
const { checkCsrfToken } = require("../middleware/index");
const UserMiddleware = require("../middleware/UserMiddleware");
const { validateUser } = require('../Validates/UserValidate');

userRoute.get("/gen", UserController.gen);
userRoute.get("/add", UserMiddleware.Themthanhvien,UserController.add);
userRoute.post("/add", validateUser(), [checkCsrfToken, UserMiddleware.Themthanhvien], UserController.store);
userRoute.get("/edit/:id", UserMiddleware.Suathanhvien, UserController.edit);
userRoute.post("/edit/:id", validateUser(), [checkCsrfToken, UserMiddleware.Suathanhvien], UserController.update);
userRoute.post("/delete", [checkCsrfToken, UserMiddleware.Xoathanhvien], UserController.delete);
userRoute.post("/delete-mul", [checkCsrfToken, UserMiddleware.Xoathanhvien], UserController.deleteMul);
userRoute.get("/", UserMiddleware.Xemdanhsachthanhvien,UserController.view);

userRoute.post("/ajaxChangeStatus", checkCsrfToken, UserController.ajaxChangeStatus);
userRoute.get("/listjson",  UserController.listjson);

module.exports = userRoute;
