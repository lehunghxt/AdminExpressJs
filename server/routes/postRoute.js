const express = require('express');
const postRoute = express.Router();
const PostController = require('../controllers/PostController');
const {checkCsrfToken} = require('../middleware/index');
const PostMiddleware = require('../middleware/PostMiddleware');
const {validatePost} = require('../Validates/PostValidate');

postRoute.get('/gen', PostController.gen);
postRoute.get('/add', PostMiddleware.Thembaiviet, PostController.add);
postRoute.post('/add', validatePost(), [PostMiddleware.Thembaiviet, checkCsrfToken], PostController.store);
postRoute.get('/edit/:id', PostMiddleware.Suabaiviet, PostController.edit);
postRoute.post('/edit/:id', validatePost(), [PostMiddleware.Suabaiviet, checkCsrfToken], PostController.update);
postRoute.post('/delete', [PostMiddleware.Xoabaiviet, checkCsrfToken],PostController.delete);
postRoute.post('/delete-all', [PostMiddleware.Xoabaiviet, checkCsrfToken], PostController.deleteAll);
postRoute.get('/ajaxPost/:id', PostController.ajaxPost);
postRoute.get('/', PostMiddleware.Xemdanhsachbaiviet, PostController.view);

postRoute.post('/ajaxChangeStatus', checkCsrfToken, PostController.ajaxChangeStatus);

module.exports = postRoute;