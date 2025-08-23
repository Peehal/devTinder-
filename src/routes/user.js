const express = require("express");
const { model } = require("mongoose");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../Models/connectionRequest")

userRouter.get("/user/request/received", userAuth, async(req, res) =>{

    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId","firstName lastName ")
        // }).populate("fromUserId",["firstName", "lastName"])

        res.json({
            message:"Data fetched Successfully ",
            data : connectionRequest,
        })

    } catch (error) {
        res.status(400).send("ERROR:" + error.message)
    }

})


module.exports = userRouter;