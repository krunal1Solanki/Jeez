const UserModel = require('../Model/UserModel');
const { validateUser } = require('../Utils/Validators');

exports.registerUser =  (async (req, res) => {
    const { username, password, email, mobile } = req.body;
    console.log(req.body);
    try {
        await validateUser({ username, password, email, mobile });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: 'validation error',
            error: error,
        });
    }


    try {
        await UserModel.verifyUsernameAndEmail({username, email});
    } catch(error) {
        console.log(error)
        return res.status(400).send({
            message : error.message,
        })
    }

    try {
        await UserModel.registerUser({ username, password , email, mobile });
        return res.status(200).send({
            message : "User created successfully",
        })
    } catch(error) {
        console.log(error)
        return res.status(400).send({        
            message : "database error",
            error : error.message,
        })
    }
});

exports.loginUser = (async (req, res) => {
    const {name, password} = req.body;
    console.log(req.session);
    try {
        const info = await UserModel.loginUserFun({name, password, req});
        console.log(req.session);
        return res.status(200).send({
            message : 'login successful'
        })
    } catch(error) {
        return res.status(400).send({
            message : 'error occured',
            error : error.message
        })
    }
})


exports.logoutUser = (req, res) => {
    try {
        req.session.destroy();
        return res.send({
            message : "logged out successfully"
        })
    } catch(error) {
        return res.status(400).send({
            message : 'logout error',
            error : error 
        })
    }
} 

exports.checkAuth = (req, res) => {
    try {
        if(!req.session.isAuth) throw new Error('Unauthorized');
        return res.status(200).send();
    } catch (error) {
        return res.status(401).send({
            message : 'Unauthorized',
        })
    }
}