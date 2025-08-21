const express = require("express");
const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation")

const {userAuth} = require("../middlewares/auth")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user =req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
 try {
   if(!validateEditProfileData(req)){
    throw new Error ("not valid fields ")
  }

  const loggedInUser = req.user;

  Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

  await loggedInUser.save();

  res.send(` ${loggedInUser.firstName}, your profile has been updated successfully`);
  
 } catch (error) {
  res.status(400).send("Error : " + error.message);
 }
  
})


module.exports = profileRouter;