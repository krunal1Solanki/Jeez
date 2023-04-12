const Product = require("../Schema/Product");
const fs = require('fs')


const ProductModel = class {
    static saveProductDb = async ({ name, contentType, fileName, description, quantity, unitPrice }) => {
        try {
            const product = new Product({
                name: name,
                image: {
                    data : fs.readFileSync('uploads/'+fileName),
                    contentType : contentType
                },
                description: description,
                quantity: quantity,
                unitPrice: unitPrice
            })

            const info = await product.save();
            return info;
        } catch (error) {

            throw error
        }
    }

    static findProduct = async (productId) => {
        try {
            const product = await Product.findOne({_id : productId});
            return product;
        } catch (error) {
            throw error.message;
        }
    }

    static getProductsDb = async (skip) => {
        skip = Number(skip);
        try {
            const products = await Product.aggregate([
                {
                    $facet: {
                        data: [
                            { $skip: skip },
                            { $limit: 4 }
                        ]
                    }
                }
            ]);
            return products[0].data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductModel