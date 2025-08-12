const mongoose = require('mongoose');
require('dotenv').config();

const connectDB  = async () =>{

    // await mongoose.connect("mongodb+srv://<new_user>:<new_pass>@cluster0.ndfc21x.mongodb.net/devTinder ");

    await mongoose.connect(process.env.MONGO_URI);
    
};

module.exports = connectDB;
