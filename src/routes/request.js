const express = require("express");
const requestRouter =express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../Models/connectionRequest");
const User = require("../Models/user")

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) =>{
  try {
    const fromUserId = req.user._id;
  const toUserId = req.params.userId;
  const status = req.params.status;

  const allowedStatus = ["interested", "ignored"];
  if (!allowedStatus.includes(status)){
    return res.status(404).json({message:"Invalid Status"})
  }

  const toUser = await User.findById(toUserId);
  if(!toUser){
    return res.status(404).json({message:"User not found"})
  };

  const existingConnectionRequest = await ConnectionRequest.findOne({
  $or: [
    { fromUserId, toUserId },
    { fromUserId: toUserId, toUserId: fromUserId },
  ],
});

if (existingConnectionRequest) {
  return res.status(400).json({ message: "Connection request already exists" });
}

 
  const connectionRequest = new ConnectionRequest({
  fromUserId,
  toUserId, 
  status,
  });

  const data = await connectionRequest.save();
  res.json({
    message:` connection Rewuest sent successfully `,data,
  })

  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
})

requestRouter.post("/request/review/:status/:requestId", userAuth  , async (req, res) =>{
  try {
    
    const loggedInUser = req.user;
    const {status, requestId} = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus){
     return res.status(400).json({message:"Status is Invalid"});
    }

    const connectionRequest = await ConnectionRequest.findOne ({
      _id : requestId,
      toUserId:loggedInUser._id,
      status:"interested",
    });
    if(!connectionRequest){
      return res
              .status(400)
              .json({message:"ConnectionRequest not found "})
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({message:"CONNECTION REQUEST" + status, data})

  } catch (error) {
    res.status(400).send("ERROR:"+error.message)
  }
})

module.exports = requestRouter;