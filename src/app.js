// const express = require("express");

// const app = express();

// app.use("/hello/2", (req, res) => {
//     res.send("Hello from 2 !!");
    
// })

// app.use("/hello", (req, res) => {
//     res.send("Hello Hello Hello !!");
    
// })

// app.use("/user", (req, res) =>{
//     res.send("HAHAHHAHAHHAHAHAHAH");
// })

// app.get("/user", (req, res) => {
//     res.send({FirstName : "Peehal", BFName : "Rohan BABY"});
// });

// app.post("/user", (req, res) => {
// //    Data has been stored to db
//     res.send("data has been successfully stored");
// });

// app.delete("/user", (req, res) => {

//     res.send("data has been successfully deleted");
// });


// app.patch("/user", (req, res) => {

//     res.send({FirstName :"Pihu"});
// });

// app.put("/user", (req, res) => {

//     res.send({lastName :"rohan"});
// });

// app.use( "/test", (req, res) => {
//     res.send("namaste from the Pihu - test!!"); 
// });


// app.use("/", (req, res) => {
//     res.send("Hello from the server!!");
    
// })



// app.get("/ab?c",(req, res) => {
//     // res.send("Hello from ABC!!");
//       res.send({FirstName :"Pihu"})
// })

// app.get(/ab?c/, (req, res) => {
//   res.send({ FirstName: "Pihu" });
// });


// app.get(/b/, (req, res) => {
//   res.send({ FirstName: "Peehu" });
// });

// app.get(/.*an$/, (req, res) => {
//   res.send({ FirstName: "rohan" });
// });

// app.get("/user", (req, res) =>{
//     console.log(req.query);
//     res.send(req.query);
// })

// app.get("/user/:userID/:name/:password", (req, res) =>{
//     console.log(req.params);
//     res.send("Played");
    
// })


// ************************************************** MIDDLEWARE AND ERROR HANDLING ************************************


// app.use("/user", (req,res) => {
//   console.log("Route Handler");
//   res.send("Response has been send");
// });

// Multiple route Handler 

// app.use("/user", (req, res) => {
//   console.log("handling the route user1 ");
//   res.send("Response 1");
// },
// (req, res) =>
// {
//   console.log("handling the route user 2");
//   res.send("Response 2");
// })


// app.use("/user", (req, res, next) => {
//   console.log("handling the route user1 ");
//   next();
// },
// (req, res) =>
// {
//   console.log("handling the route user 2");
//   res.send("Response 2");
// })


// app.use("/user", (req, res, next) => {
//   console.log("handling the route user1 ");
//   res.send("Response 1");
//   next();
// },
// (req, res) =>
// {
//   console.log("handling the route user 2");
//   res.send("Response 2");
// })


// app.use("/user", (req, res, next) => {
//   console.log("handling the route user1 ");
//   next();
//   res.send("Response 1");
// },
// (req, res) =>
// {
//   console.log("handling the route user 2");
//   res.send("Response 2");
// })

// app.use("/user",[ (req, res, next) => {
//   console.log("handling the route user1 ");
//   next();
// },
// (req, res, next) =>
// {
//   console.log("handling the route user 2");
//   next();
// },

// (req, res, next) =>
// {
//   console.log("handling the route user 3");
//   next();
// },

// (req, res, next) =>
// {
//   console.log("handling the route user 4");
//   next();
// },

// (req, res, next) =>
// {
//   console.log("handling the route user ");
//   res.send("RESPONSE 5 ");
// }]);

// app.get("/user", (req, res, next) => {
//   console.log("handling the route user1 ");
//   next();
// });

// app.get("/user",(req, res, next) => {
//   console.log("handling the route user1 ");
//   res.send("Second route Handler");
// });


// **************************************************************USES OF MIDDLEWARE *****************************

// const {adminAuth, userAuth} = require("./middlewares/auth.js");

// app.use("/admin", adminAuth);
// // app.use("/admin", userAuth);

// app.get("/user", userAuth, (req, res) =>{
//   res.send("user user ")
// })

// app.get("/admin/getallData", (req, res) =>{
//   res.send("User Data Sent");
// })

// app.get("/admin/detele", (req, res) =>{
//   res.send("Deleted all the Data");
// });



// *********************** ERROR HANDLING ********************************************************


// app.get("/getTheUser", (req, res) =>{
//   // logic of DB call and get user data 

//   throw new Error("this is the error");
//   res.send("user user ")
// });

// app.use("/", (err, req, res , next ) =>{
//   if(err){
//     res.status(500).send("Something went wrong");
//   }
// });

// app.get("/getTheUser", (req, res) =>{
//   // logic of DB call and get user data 
//  try {
//   throw new Error("this is the error");
//   res.send("user user ")
//  } catch (error) {
//    res.status(500).send("Something went wrong in catch ");
//  }
  
// });

// app.use("/", (err, req, res , next ) =>{
//   if(err){
//     res.status(500).send("Something went wrong");
//   }
// });

// app.listen(3000, () =>{
//     console.log("Server is successfully reading");
// });

// *************************************************************** Databases *************************************************************

const express = require("express");

const connectDB =require ("./config/Database")

const User = require("./Models/user")

const app = express();

const {validateSignUpData } = require ("./utils/validation");

const bcrypt = require("bcrypt");

app.use(express.json());

// data of one user through email

// app.get("/user", async (req, res) => {
//     const userEmail =  req.body.emailID;

//     try{
//         const users = await User.find({emailID : userEmail});
//         if (users.length === 0) {
//             res.status(404).send("User not found")
//         } else {
//              res.send(users)
//         }
       
//     }
//     catch(err){
//         res.status(400).send("Something went wrong ")
//     }
// })

// 1 user only through Email 
app.get("/user", async (req, res) => {
    const userEmail =  req.body.emailID;

    try{
        const users = await User.findOne({emailID : userEmail});
        if (users.length === 0) {
            res.status(404).send("User not found")
        } else {
             res.send(users)
        }
       
    }
    catch(err){
        res.status(400).send("Something went wrong ")
    }
})


// Feed API - GET /feed - get all the users from the Database

app.get("/feed", async(req, res) =>{
    try{
        const users = await User.find({ });
        if (users.length === 0) {
            res.status(404).send("User not found")
        } else {
             res.send(users)
        }
    }
    catch(err){
        res.status(400).send("Something went wrong ")
    }
})

// Delete user API 

app.delete ("/user", async(req, res) =>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("Successfully Deleted the user")
    } catch (error) {
        res.status(400).send("Something went wrong ")
    }
})

// Update the user 

app.patch("/user/:userId", async (req, res) =>{
    const userId = req.params?.userId;
    const data = req.body;

    try {

        const ALLOWED_UPDATE = ["gender", "age", "photoUrl", "about", "skills"];

        const UpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));

        if (!UpdateAllowed){
            throw new Error ("Update not allowed")
        }
        if(data?.skills.length > 10){
            throw new Error("Skills connot be more than 10 ")
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
        });
        res.send("Successfully updated the data")

    } catch (error) {
        res.status(400).send(" UPDATE FAILED : " + error.message)
    }
})


// Update the user with emailID

// app.patch("/user", async(req, res) =>{
//     const emailID = req.body.emailID;
//     const data = req.body;
//     console.log(data)
//     try {
//         await User.findOneAndUpdate({emailID: emailID}, data);
//         res.send("Successfully updated the data")
//     } catch (error) {
//         res.status(400).send("Something went wrong ")
//     }
// })


app.post("/login", async (req, res) =>{

   try {
     const {emailID, password} = req.body;

    const user = await User.findOne({ emailID : emailID});

    if (!user){
        throw new Error("Invalid credentials")
    }

    const passowrdValid = await bcrypt.compare(password, user.password);

    if (passowrdValid){
        res.send("Login successfully!!")
    }else{
        throw new Error("Invalid credentials")
    }
   } catch (error) {
    res.status(400).send("Error : "+ error.message )
   }
})

app.post("/signup", async (req, res) => {

    try {

        // validate the users

        validateSignUpData(req);


        const data = req.body;
        if (data.firstName) {
            data.firstName = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1);
        }

        if (data.lastName) {
            data.lastName = data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1);
        }

        // ENCRYPT THE Password

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);


        // Creating a new instandce of the User Model 
        const user = new User ({
            firstName,
            lastName,
            emailID,
            password:passwordHash

        });

        await user.save();
        res.send("Data successfully Added ")
    } catch (error) {
        res.status(400).send("error saving the user "+ error.message )
    }

})

connectDB()
.then(() => {
    console.log("database is connected");
    app.listen(3000, () =>{
    console.log("Server is successfully reading");
});
})
.catch((err) => {
    console.log("Database is not connected");
})

