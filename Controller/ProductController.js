const ProductModel = require("../Model/ProductModel");
const { productValidator } = require("../Utils/Validators")

exports.addProduct = (req, res) => {
    const {name, image, description, quantity, unitPrice} = req.body;
    
    const fileName = req.file.filename;
    const contentType = req.file.mimetype;
   
    console.log(fileName, contentType);
    // res.send('sd');

    try {
        const valid = productValidator({name, description, quantity, unitPrice});
        if(!valid) throw new Error('missing data')
    } catch (error) {
        return res.status(400).send({
            message : 'Error Occured',
            error : error.message
        })
    }

    try {
        const info = ProductModel.saveProductDb({name, fileName, contentType, description, quantity, unitPrice});
        console.log('domeee');
        return res.status(201).send({
            message : 'Product Added Successfully',
        })
    } catch (error) {     
        return res.status(400).send({
            message : 'Error Occured',
            error : error
        })  
    }
}


exports.getProducts = async (req, res) => {
    const skip = req.query.skip || 0;
    try {
        const products = await ProductModel.getProductsDb(skip);
        return res.status(200).send({
            message : 'retrieved successful',
            data : products
        })
    } catch (error) {
        return res.status(400).send({
            message : 'error occured',
            error : error.message
        })
    }
}

    
exports.updateProductQuantity = async (req, res) => {
    const  {productId, updateProductQuantity} = req.body;    
    try {
        const product = await ProductModel.findProduct(productId);
        product.quantity = updateProductQuantity;

        await product.save();

        return res.status(201).send({
            message : 'quantity updated successfully',
            data : product
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message : 'error occured',
            erro : error,
        })
    }
}