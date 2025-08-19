const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String, 
        required: true, 
        minLength:4,
        maxLength:30,
    },
    lastName : {
        type : String,
        minLength:4,
        maxLength:10,
    },
    emailID : {
        type : String, 
        required: true, 
        unique: true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("in valid email" + value);
            }
        }
    },
    password : {
        type : String, 
        required: true, 
//         validate(value) {
//             let errors = [];

//     if (!/[A-Z]/.test(value)) {
//       errors.push("Password must contain at least one uppercase letter");
//     }

//     if (!/[0-9]/.test(value)) {
//       errors.push("Password must contain at least one number");
//     }

//     if (!/[@$!%*?&]/.test(value)) {
//       errors.push("Password must contain at least one special character (@, $, !, %, *, ?, &)");
//     }

//     if (value.length < 8) {
//       errors.push("Password must be at least 8 characters long");
//     }

//     if (errors.length > 0) {
//       throw new Error(errors.join(" | "));
//     }
//   }
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not a strong password " + value);
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
        default:"",
        // validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("in valid url" + value);
        //     }
        // }

    },
    about :{
        type:String,
        default:"this is the default about of User "
    }, 
    skills:{
        type:[String],
        // validate(value){
        //     if (value.length > 5 ){
        //         throw new Error("limit yout skills")
        //     }
        //     if (value.length < 1){
        //         throw new Error("Add at least 1 skill");
        //     } 
        // }
    },
    joinedAt:{
    type: Date,
    default: Date.now
  }

}, {
    timestamps : true
});

module.exports =  mongoose.model("User",userSchema);;
