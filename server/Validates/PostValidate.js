const { check } = require('express-validator');
const PostModel = require('../models/PostModel');
var validatePost = () => {
    return [
        check('title').not().isEmpty().trim().withMessage('Tiêu đề bài viết không được để trống.').custom(  (title, {req}) => {
            return new Promise(async(res, rej) => {
                const post = await PostModel.findByTitle(title);
                if(post != null && req.params.id && post._id != req.params.id){
                    rej('Tên bài viết đã tồn tại.');
                } else if(post != null && !req.params.id){
                    rej('Tên bài viết đã tồn tại.');
                }
                else{
                    res(true);
                }
            })
        }),
        check('description').not().isEmpty().trim().withMessage('Mô tả bài viết không được để trống.'),
        check('content').not().isEmpty().trim().withMessage('Nội dung bài viết không được để trống.'),
    ]
}
module.exports = {
    validatePost,
}