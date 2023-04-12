const CartModel = require("../Model/CartModel");

exports.addToCart = async (req, res) => {
    console.log(req.session.id);
    const productId = req.query.productId;
    
    try {
        let userId = req.session.user.id;
        await CartModel.addToCartDb(userId, productId);
        console.log('done');
        console.log('---dsds---')

        return res.status(201).send({
            message : "item added successfully into cart",
        })
    } catch (error) {
        console.log('------',error)
        console.log('not done');
        return res.status(400).send({
            message : 'something went wrong',
            error:  error
        })
    }
}


exports.getCarts = async (req, res) => {
    try {
        const carts = await CartModel.getCartsDb();
        return res.status(200).send({
            message : 'Carts fethced successfully',
            data : carts
        })
    } catch (error) {
        return res.status(400).send({
            message : 'error occured',
            error : error,
        })
    }
}

exports.getMyCart = async (req, res) => {
    try {
        let userId = req.session.user.id;
        const cart = await CartModel.getMyCartDb(userId);
        return res.status(200).send({
            message : 'Carts fetched successfully',
            data : cart
        })
    
    } catch (error) {
        return res.status(400).send({
            message : 'error occured',
            error : error,
        })
    }
}


exports.removeFromCart = async(req, res) => {
    try {
        const productId = req.query.productId;
        const userId = req.session.user.id;
        console.log('prod',productId,'user',userId);
        await CartModel.removeFromCartDb(userId, productId);
        console.log('all finde')
        return res.status(201).send({
            message : "item removed from cart successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            message : 'something went wrong',
            error:  error
        })
    }
}