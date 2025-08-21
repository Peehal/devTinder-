const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../Models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    // validate the users

    validateSignUpData(req);

    const data = req.body;
    if (data.firstName) {
      data.firstName =
        data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1);
    }

    if (data.lastName) {
      data.lastName =
        data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1);
    }

    // ENCRYPT THE Password

    const passwordHash = await bcrypt.hash(data.password, 10);
    console.log(passwordHash);

    // Creating a new instandce of the User Model
    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      emailID: data.emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("Data successfully Added ");
  } catch (error) {
    res.status(400).send("error saving the user " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passowrdValid = await user.validatePassword(password)

    if (passowrdValid) {
      // Create JWT TOKEN

      const token = await user.getJWT();

      // ADD the token to cookie and send the response back to hte user

      res.cookie("token", token, {expires:new Date(Date.now() + 1000 * 7200000)});
      res.send("Login successfully!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = authRouter;