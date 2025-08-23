const express = require("express");
const profileRouter = express.Router();
const {validateEditProfileData,validateEditPassword  } = require("../utils/validation")

const {userAuth} = require("../middlewares/auth")
const bcrypt = require("bcrypt");

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

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateEditPassword(req)) {
      throw new Error("Invalid fields in request body");
    }

    const user = req.user;

    const isValid = await user.validatePassword(req.body.currentPassword);
    if (!isValid) {
      throw new Error("Current password is incorrect");
    }

    user.password = req.body.newPassword;
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();

    res.send(`${user.firstName}, your password has been updated successfully`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = profileRouter;