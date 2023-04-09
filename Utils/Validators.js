const validator = require('validator');

exports.productValidator = ({name, image, description, quantity, unitPrice}) => {
    if(!name || !description || !quantity || !unitPrice) return false;
    return true;
}

exports.validateUser = async ({ email, mobile, password, username }) => {
    const errors = {};
  
    if (!email || !validator.isEmail(email)) {
      errors.email = "Invalid email";
    }
    if (!mobile || !validator.isMobilePhone(mobile)) {
      errors.mobile = "Invalid mobile number";
    }
    if (!password || password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }
    if (!username || username.length < 3) {
      errors.username = "Name should be at least 3 characters long";
    }
  
    if (Object.keys(errors).length > 0) {
      throw { message: "Validation error", errors };
    }
  };
  