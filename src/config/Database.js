const mongoose = require('mongoose');

const connectDB  = async () =>{
    await mongoose.connect("mongodb+srv://PeehuRoh:Rohan@cluster0.ndfc21x.mongodb.net/devTinder ");
};

module.exports = connectDB;
