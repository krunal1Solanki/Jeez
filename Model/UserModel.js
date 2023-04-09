const userSchema = require('../Schema/User.js')
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserModel = class {

    static findUser = async (id) => {
        try {
            const user = userSchema.find({_id : id});
            return user;
        } catch (error) {
            throw error.message;
        }
    }

    static async verifyUsernameAndEmail({ email, username }) {
        let dummyUser;
        try {
            dummyUser = await userSchema.findOne({
                $or: [
                    { email: email },
                    { username: username }
                ]
            });
        } catch (error) {
            throw new Error('database error');
        }
        if (dummyUser) throw new Error('User already exists with that username');
    }

    static async registerUser(user) {
        const hashPass = await bcrypt.hash(user.password, 12);
        try {
            const newUser = new userSchema({
                username : user.username ,
                password: hashPass,
                email : user.email,
                mobile : user.mobile,
                cartId : null,
            })
            await newUser.save()
        } catch (error) {
            
            console.log('.............',error);
            throw new Error('database error');
        }
    }

    static async loginUserFun({name, password, req}) { 
        let user;
        try {
            if(validator.isEmail(name)) {
                user = await userSchema.findOne({email : name});
            } else {
                user = await userSchema.findOne({username : name});
            }
        } catch (error) {
            console.log('.............',error);
            throw new Error('database error')
        }
    
        if(!user) {
            throw new Error('No user exists, please register first !')
        }
    
        try {
            let result = await bcrypt.compare(password, user.password);
            if(result) {
                req.session.isAuth = true;
                req.session.user = {
                    name : user.email,
                    id : user._id
                }
                return;
            } else {
                throw new Error('Incorrect Password');
            }
        } catch(error) {
            throw error
        }
    }
}

module.exports = UserModel;
