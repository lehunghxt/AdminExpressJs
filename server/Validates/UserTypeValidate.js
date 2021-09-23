const { check } = require('express-validator');
const UserTypeModel = require('../models/UserTypeModel');
const UserModel = require('../models/UserModel');
var validateUserType = () => {
    return [
        check('TypeName').not().isEmpty().trim().withMessage('Loại tài khoản không được để trống.'),
        check('TypeCode').not().isEmpty().trim().withMessage('Code không được để trống.').isNumeric().withMessage('Vui lòng nhập số.'),
    ]
}
module.exports = {
    validateUserType,
}