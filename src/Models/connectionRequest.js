const mongoose = require ("mongoose");
const { rawListeners } = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }, 
    toUserId :{     
        type:mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored" ,"interested" ,"accepted" ,"rejected"],
            message: "{VALUE} is not valid",
        }
    },
},
 {timestamps : true});

connectionRequestSchema.index({ fromUserId:1, toUserId:1});

connectionRequestSchema.pre ("save", function(next){
    const connectionRequest = this;

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("can't send the request to yourself!!");
        
    }
    next();
})

const ConnectionRequestModel = mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;