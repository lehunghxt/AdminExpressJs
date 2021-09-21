const express = require('express');
const roleRoute = express.Router();
const RoleController = require('../controllers/RoleController');
const {checkCsrfToken} = require('../middleware/index');

roleRoute.get('/', RoleController.view);
roleRoute.post('/', checkCsrfToken, RoleController.store);
roleRoute.post('/edit', checkCsrfToken, RoleController.update);
roleRoute.post('/delete', checkCsrfToken, RoleController.delete);

module.exports = roleRoute;