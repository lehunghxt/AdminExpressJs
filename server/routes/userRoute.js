const express = require("express");
const userRoute = express.Router();
const UserController = require("../controllers/UserController");
const { checkCsrfToken } = require("../middleware/index");

userRoute.get("/gen", UserController.gen);
userRoute.get("/add", UserController.add);
userRoute.post("/add", checkCsrfToken, UserController.store);
userRoute.get("/edit/:id", UserController.edit);
userRoute.post("/edit/:id", checkCsrfToken, UserController.update);
userRoute.post("/delete", checkCsrfToken, UserController.delete);
userRoute.post("/delete-mul", checkCsrfToken, UserController.deleteMul);
userRoute.get("/", UserController.view);

module.exports = userRoute;
