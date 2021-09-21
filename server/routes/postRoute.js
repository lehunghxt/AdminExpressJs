const express = require('express');
const postRoute = express.Router();
const PostController = require('../controllers/PostController');
const {checkCsrfToken} = require('../middleware/index');

postRoute.get('/gen', PostController.gen);
postRoute.get('/add', PostController.add);
postRoute.post('/add', checkCsrfToken, PostController.store);
postRoute.get('/edit/:id', PostController.edit);
postRoute.post('/edit/:id', checkCsrfToken, PostController.update);
postRoute.post('/delete', checkCsrfToken, PostController.delete);
postRoute.post('/delete-all', checkCsrfToken, PostController.deleteAll);
postRoute.get('/', PostController.view)

module.exports = postRoute;