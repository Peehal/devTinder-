const express = require("express");
const connectDB = require("./config/Database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
require("./utils/cronjob");


// app.use(
//   cors({
//     origin:"*",
//     credentials: true,
//   }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,               
  })
);


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require ("./routes/user")


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("database is connected");
    app.listen(process.env.Port, () => {
      console.log("Server is successfully reading");
    });
  })
  .catch((err) => {
    console.log("Database is not connected");
  });