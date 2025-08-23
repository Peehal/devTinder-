const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require ("bcrypt");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String, 
        required: true, 
        index:true,
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

}, {
    timestamps : true
});

userSchema.index({firstName :1, lastName: 1});

userSchema.methods.getJWT = async function (passwordInputByUser){
    const user = this;

    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$7900")

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const passowrdValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return passowrdValid;
}


module.exports =  mongoose.model("User",userSchema);
