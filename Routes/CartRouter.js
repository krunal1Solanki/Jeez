const express = require('express');
const { addToCart, getCarts, removeFromCart, getMyCart  } = require('../Controller/CartController');
const { isAuth } = require('../Middlewares/IsAuth');
const CartRouter = express.Router();


CartRouter.route('/add-to-cart').post( addToCart); 
CartRouter.route('/remove-from-cart').get(removeFromCart);
CartRouter.route('/get-carts').get( getCarts);
CartRouter.route('/get-my-cart').get( getMyCart);


module.exports =  {CartRouter}