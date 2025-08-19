const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String, 
        required: true, 
        minLength:4,
        maxLength:30,
    },
    lastName : {
        type : String
    },
    emailID : {
        type : String, 
        required: true, 
        unique: true,
        lowercase:true,
        trim:true
    },
    password : {
        type : String, 
        required: true, 
        validate(value) {
            let errors = [];

    if (!/[A-Z]/.test(value)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[0-9]/.test(value)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[@$!%*?&]/.test(value)) {
      errors.push("Password must contain at least one special character (@, $, !, %, *, ?, &)");
    }

    if (value.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(" | "));
    }
  }

},
    age : {
        type : String,
        min:18
    },
    gender : {
        type : String, 
        validate(value){
            if (!["male", "female", "others"].includes(value)){
                throw new Error ("valid gender is not entered ");
            }
        }

        // or for the validation 
        // enum: ["male", "female", "others"],
    },
    photoUrl :{
        type: String, 
        default:""
    },
    about :{
        type:String,
        default:"this is the default about of User "
    }, 
    skills:{
        type:[String]
    },
    joinedAt:{
    type: Date,
    default: Date.now
  }

}, {
    timestamps : true
});

module.exports =  mongoose.model("User",userSchema);;
