const express = require('express');
const postRoute = express.Router();
const PostController = require('../controllers/PostController');
const {checkCsrfToken} = require('../middleware/index');
const {validatePost} = require('../Validates/PostValidate');

postRoute.get('/gen', PostController.gen);
postRoute.get('/add', PostController.add);
postRoute.post('/add', validatePost(), checkCsrfToken, PostController.store);
postRoute.get('/edit/:id', PostController.edit);
postRoute.post('/edit/:id', validatePost(), checkCsrfToken, PostController.update);
postRoute.post('/delete', checkCsrfToken, PostController.delete);
postRoute.post('/delete-all', checkCsrfToken, PostController.deleteAll);
postRoute.get('/ajaxPost/:id', PostController.ajaxPost);
postRoute.get('/', PostController.view);

module.exports = postRoute;