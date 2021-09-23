const express = require('express');
const roleRoute = express.Router();
const RoleController = require('../controllers/RoleController');
const { validateRole, validateEditRole } = require('../Validates/RoleValidate');
const {checkCsrfToken} = require('../middleware/index');
const RoleMiddleware = require('../middleware/RoleMiddleware');

roleRoute.get('/', RoleMiddleware.Xemdanhsachquyen, RoleController.view);
roleRoute.post('/', validateRole(), [checkCsrfToken, RoleMiddleware.Themquyen], RoleController.store);
roleRoute.post('/edit', validateEditRole(), [checkCsrfToken, RoleMiddleware.Suaquyen], RoleController.update);
roleRoute.post('/delete', [checkCsrfToken, RoleMiddleware.Xoaquyen], RoleController.delete);

module.exports = roleRoute;