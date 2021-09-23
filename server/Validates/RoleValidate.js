const { check } = require('express-validator');
const RoleModel = require('../models/RoleModel');
var validateRole = () => {
    return [
        check('roleGroup').not().isEmpty().trim().withMessage('Nhóm quyền không được để trống.'),
        check('roleName').not().isEmpty().trim().withMessage('Tên quyền không được để trống.').custom((roleName , {req}) => {
            return new Promise(async(res, rej) => {
                const role = await RoleModel.findByRoleName(roleName);
                if(role != null && req.params.id && role._id != req.params.id){
                    rej('Tên quyên này đã tồn tại.');// case update
                } else if(role != null && !req.params.id){
                    rej('Tên quyên này đã tồn tại.');// case add
                }
                else{
                    res(true);
                }

            })
        }),
    ]
}
var validateEditRole = () => {
    return [
        check('editName').not().isEmpty().trim().withMessage('Tên quyền không được để trống.').custom((editName , {req}) => {
            return new Promise(async(res, rej) => {
                const role = await RoleModel.findByRoleName(editName);
                if(role != null && role._id != req.body.roleId){
                    rej('Tên quyền này đã tồn tại.');// case update
                } else{
                    res(true);
                }

            })
        }),
    ]
}
module.exports = {
    validateRole,
    validateEditRole,
}