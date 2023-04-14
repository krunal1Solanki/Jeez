const express = require('express');
const { addToCart, getCarts, removeFromCart, getMyCart  } = require('../Controller/CartController');
const { isAuth } = require('../Middlewares/IsAuth');
const CartRouter = express.Router();


CartRouter.route('/add-to-cart').post(isAuth, addToCart); 
CartRouter.route('/remove-from-cart').get(isAuth, removeFromCart);
CartRouter.route('/get-carts').get(isAuth, getCarts);
CartRouter.route('/get-my-cart').get(isAuth, getMyCart);


module.exports =  {CartRouter}