const express = require('express');
const roleGroupRoute = express.Router();
const RoleGroupController = require('../controllers/RoleGroupController');
const {checkCsrfToken} = require('../middleware/index');

roleGroupRoute.get('/', RoleGroupController.view);
roleGroupRoute.post('/store', checkCsrfToken, RoleGroupController.store);
// roleGroupRoute.post('/edit', checkCsrfToken, RoleGroupController.update);
// roleGroupRoute.post('/delete', checkCsrfToken, RoleGroupController.delete);
// roleGroupRoute.post('/delete-mul', checkCsrfToken, RoleGroupController.deleteMul);
// roleGroupRoute.get('/gen', RoleGroupController.gen);

module.exports = roleGroupRoute;