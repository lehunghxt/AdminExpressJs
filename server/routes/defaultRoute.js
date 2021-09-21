const express = require('express');
const defaultRoute = express.Router();
const AuthController = require('../controllers/AuthController');
const {checkCsrfToken, isLogged} = require('../middleware/index');

defaultRoute.get('/', isLogged, (req, res)=> {
    res.render('home');
})
defaultRoute.get('/login', AuthController.showlogin)
defaultRoute.post('/login', checkCsrfToken, AuthController.login)
defaultRoute.get('/register', AuthController.showregister)

module.exports = defaultRoute;