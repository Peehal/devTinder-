const validator = require("validator");

const validateSignUpData = (req) =>{

    const{firstName, lastName, emailID, password} = req.body;

    if (!firstName || !lastName){
        throw new Error("Please enter valid name ")
    }else if (! validator.isEmail(emailID)){
        throw new Error("Please give me the valid email");

    }else if(! validator.isStrongPassword(password)){
        throw new Error ("your passowrd is not a strong pssword")
    }
}

module.exports = { validateSignUpData };