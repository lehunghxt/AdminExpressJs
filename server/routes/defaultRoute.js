const express = require('express');
const defaultRoute = express.Router();
const AuthController = require('../controllers/AuthController');
const {checkCsrfToken, isLogged} = require('../middleware/index');
const uploadMulter = require('../middleware/UploadImage');

defaultRoute.get('/', isLogged, (req, res)=> {
    res.render('home');
})
defaultRoute.get('/login', AuthController.showlogin);
defaultRoute.post('/login', checkCsrfToken, AuthController.login);
defaultRoute.get('/register', AuthController.showregister);
defaultRoute.post('/logout', [checkCsrfToken, isLogged], AuthController.logout);
defaultRoute.get('/profile', isLogged, AuthController.profile);
defaultRoute.post('/profile', uploadMulter.single('image'), [checkCsrfToken, isLogged], AuthController.updateProfile);


module.exports = defaultRoute;