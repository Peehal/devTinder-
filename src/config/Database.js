const mongoose = require('mongoose');

const connectDB  = async () =>{
    await mongoose.connect("mongodb+srv://<new_user>:<new_pass>@cluster0.ndfc21x.mongodb.net/devTinder ");
};

module.exports = connectDB;
