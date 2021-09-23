const { check } = require('express-validator');
const UserTypeModel = require('../models/UserTypeModel');
const UserModel = require('../models/UserModel');
var validateUser = () => {
    return [
        check('name').not().isEmpty().trim().withMessage('Tên thành viên không được để trống.'),
        check('email').not().isEmpty().trim().withMessage('Email không được để trống.')
        .isEmail().withMessage('Email không hợp lệ')
        .custom((email, {req}) => {
            return new Promise(async (res, rej) => {
                const user = await UserModel.findByEmail(email);
                if(user != null && req.params.id && user._id != req.params.id){
                    rej('Email đã tồn tại.');// case update
                } else if(user != null && !req.params.id){
                    rej('Email đã tồn tại.');// case add
                }
                else{
                    res(true);
                }
            })
        }),
        check('username').not().isEmpty().trim().withMessage('Tên đăng nhập không được để trống.')
        .custom((username, {req}) => {
                return new Promise(async (res, rej) => {
                    const user = await UserModel.findByUsername(username);
                    if(user != null && req.params.id && user._id != req.params.id){
                        rej('Tên đăng nhập này đã tồn tại.');// case update
                    } else if(user != null && !req.params.id){
                        rej('Tên đăng nhập này đã tồn tại.');// case add
                    }
                    else{
                        res(true);
                    }
                })
        }),
        check('password').not().isEmpty().trim().withMessage('Mật khẩu không được để trống.'),
        check('address').not().isEmpty().trim().withMessage('Địa chỉ không được để trống.'),
        check('phone').not().isEmpty().trim().withMessage('Số điện thoại không được để trống.'),
        check('gender').not().isEmpty().withMessage('Giới tính không được để trống.')
                        .isIn(['male', 'female']).withMessage('Giới tính không hợp lệ.'),
        check('userType').not().isEmpty().withMessage('Loại tài khoản không được để trống.').custom( userType => {
            return new Promise(async(res, rej) => {
                const data = await UserTypeModel.findById(userType);
                if(data == null)
                    rej('Loại tài khoản không hợp lệ');
                else
                    res(true);
            })
        }),
    ]
}
module.exports = {
    validateUser,
}