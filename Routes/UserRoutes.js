const express = require('express');
const { registerUser, logoutUser, loginUser, checkAuth } = require('../Controller/UserController');
const { origin } = require('../Middlewares/CrossOrigin');
const { isAuth } = require('../Middlewares/IsAuth');
const UserRouter = express.Router();

UserRouter.route('/register').post(origin, registerUser);
UserRouter.route('/login').post(origin, loginUser);
UserRouter.route('/logout').get(origin, logoutUser);
UserRouter.route('/check-auth').get(checkAuth);
module.exports = {UserRouter}