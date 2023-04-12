
const Cart = require("../Schema/Cart");
const Product = require("../Schema/Product");
const User = require("../Schema/User");
const CartModel = class {
    static addToCartDb = async (userId, productId) => {
        try {
            const user = await User.findById(userId);
            const product = await Product.findById(productId);

            if (!user || !product) throw new Error('User or product not found');

            if (product.quantity === 0) throw new Error('Out Of Stock');

            let cart;
            if (user.cartId) {
                cart = await Cart.findOne({ _id: user.cartId });
            }
            else {
                cart = await this.createCartDb();
                await User.findOneAndUpdate({ _id: userId }, { cartId: cart._id });
            }

            const existingCartItem = cart.cartItems.find(item => item.productId === productId);

            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                const newCartItem = {
                    productId: productId,
                    quantity: 1
                };
                cart.cartItems.push(newCartItem);
            }

            product.quantity--;

            await cart.save();
            await product.save();

            return { message: 'Item added successfully' };
        } catch (error) {
            console.log('error 1', error);
            throw error.message;
        }
    }


    static getMyCartDb = async (userId) => {
        let cartItems = [];
        try {
            const user = await User.findById(userId);
            if (!user.cartId) return cartItems;
            const cart = await Cart.findById(user.cartId);
            cartItems = cart.cartItems;
            const cartInfo = Promise.all(
                cartItems
                    .filter((item) => item.quantity !== 0)
                    .map(async (item) => {
                        const prod = await Product.findById(item.productId);
                        const quantity = item.quantity;
                        return {
                            product: prod,
                            quantity: quantity,
                        };
                    })
            );


            return cartInfo;
        } catch (error) {
            console.log(error);
            throw error.message
        }
    }

    static removeFromCartDb = async (userId, productId) => {
        try {
            const user = await User.findOne({ _id: userId });
            const product = await Product.findOne({ _id: productId });

            let cart;
            if (!user || !product) throw new Error('User or product not found');


            if (!user.cartId)
                throw new Error('No items in the cart !');
            else {
                cart = await Cart.findById(user.cartId);
            }

            const existingCartItem = cart.cartItems.find(item => item.productId === productId);


            if (existingCartItem) {
                if (existingCartItem.quantity === 0) throw new Error('Cart is Empty for that product');
                existingCartItem.quantity--;
            } else {
                throw new Error('Cart is Empty for that product');
            }

            product.quantity++;

            await cart.save();
            await product.save();

            return { message: 'Item added successfully' };
        } catch (error) {
            throw error.message;
        }
    }
    static getCartsDb = () => {
        try {
            return Cart.find();
        } catch (error) {
            throw error.message;
        }
    }

    static createCartDb = async () => {
        try {
            const cart = new Cart({
                cartItems: []
            })
            await cart.save();
            return cart;
        } catch (error) {
            throw error.message;
        }
    }
}



module.exports = CartModel