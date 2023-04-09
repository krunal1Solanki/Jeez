const express = require('express');
const { addProduct, getProducts, updateProductQuantity} = require('../Controller/ProductController');
const { isAuth } = require('../Middlewares/IsAuth');
const ProductRouter = express.Router();

const multer = require('multer');
const { storage } = require('../Middlewares/Multer');
const upload = multer({storage : storage})


ProductRouter.route('/add-product').post(upload.single('image'), addProduct); 
ProductRouter.route('/get-products').get(getProducts)
ProductRouter.route('/update-item-quantity').put(updateProductQuantity)
// Router.route('/list-carts')

module.exports =  {ProductRouter}