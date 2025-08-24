const express = require("express");
const { model } = require("mongoose");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../Models/connectionRequest")

const USER_SAVE_DATA ="firstName lastName "

userRouter.get("/user/request/received", userAuth, async(req, res) =>{

    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId","firstName lastName " )
        // }).populate("fromUserId",["firstName", "lastName"])

        res.json({
            message:"Data fetched Successfully ",
            data : connectionRequest,
        })

    } catch (error) {
        res.status(400).send("ERROR:" + error.message)
    }

})


userRouter.get("/user/connections", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id, status :"accepted"}, 
                {toUserId:loggedInUser, status:"accepted"}
            ]
        }).populate("fromUserId", "firstName lastName ").populate("toUSerId", "firstName lastName")

        const data = connectionRequest.map((row) => row.fromUserId); 

        res.json({
            data 
        })
    } catch (error) {
        res.status(400).send("ERROR:" + error.message)
    }


})

module.exports = userRouter;