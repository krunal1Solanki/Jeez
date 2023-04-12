const express = require('express');
const { registerUser, logoutUser, loginUser, checkAuth } = require('../Controller/UserController');
const { isAuth } = require('../Middlewares/IsAuth');
const UserRouter = express.Router();

UserRouter.route('/register').post(registerUser);
UserRouter.route('/login').post(loginUser);
UserRouter.route('/logout').get(logoutUser);
UserRouter.route('/check-auth').get(checkAuth);
module.exports = {UserRouter}