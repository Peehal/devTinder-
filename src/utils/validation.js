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

const validateEditProfileData = (req) =>{

    const EditAllowedFields = ["firstName", "lastName", "age", "about", "skills", "photoUrl", "emailID", "gender"];
    
    const isEditAllowed = Object.keys(req.body).every((field) => EditAllowedFields.includes(field));

    return isEditAllowed;
}

module.exports = { validateSignUpData ,
    validateEditProfileData
};