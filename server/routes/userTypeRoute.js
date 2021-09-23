const express = require('express');
const userRoute = express.Router();
const UserTypeController = require('../controllers/UserTypeController');
const { validateUserType } = require('../Validates/UserTypeValidate');
const {checkCsrfToken} = require('../middleware/index');
const UserTypeMiddleware = require('../middleware/UserTypeMiddleware');

userRoute.get('/', UserTypeMiddleware.Xemdanhsachloaitaikhoan, UserTypeController.view);
userRoute.post('/', validateUserType(), [checkCsrfToken, UserTypeMiddleware.Themloaitaikhoan], UserTypeController.store);
userRoute.put('/', validateUserType(), [checkCsrfToken, UserTypeMiddleware.Sualoaitaikhoan], UserTypeController.update);
userRoute.post('/delete', [checkCsrfToken, UserTypeMiddleware.Xoaloaitaikhoan], UserTypeController.delete);
userRoute.post('/delete-mul', [checkCsrfToken,UserTypeMiddleware.Xoaloaitaikhoan], UserTypeController.deleteMul);
userRoute.get('/gen', UserTypeController.gen);

module.exports = userRoute;