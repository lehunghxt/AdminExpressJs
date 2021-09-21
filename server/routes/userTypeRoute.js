const express = require('express');
const userRoute = express.Router();
const UserTypeController = require('../controllers/UserTypeController');
const {checkCsrfToken} = require('../middleware/index');

userRoute.get('/', UserTypeController.view);
userRoute.post('/add', checkCsrfToken, UserTypeController.store);
userRoute.post('/edit', checkCsrfToken, UserTypeController.update);
userRoute.post('/delete', checkCsrfToken, UserTypeController.delete);
userRoute.post('/delete-mul', checkCsrfToken, UserTypeController.deleteMul);
userRoute.get('/gen', UserTypeController.gen);

module.exports = userRoute;