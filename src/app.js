const express = require("express");

const app = express();

// app.use("/hello/2", (req, res) => {
//     res.send("Hello from 2 !!");
    
// })

// app.use("/hello", (req, res) => {
//     res.send("Hello Hello Hello !!");
    
// })

// app.use("/user", (req, res) =>{
//     res.send("HAHAHHAHAHHAHAHAHAH");
// })

app.get("/user", (req, res) => {
    res.send({FirstName : "Peehal", BFName : "Rohan BABY"});
});

app.post("/user", (req, res) => {
//    Data has been stored to db
    res.send("data has been successfully stored");
});

app.delete("/user", (req, res) => {

    res.send("data has been successfully deleted");
});


app.patch("/user", (req, res) => {

    res.send({FirstName :"Pihu"});
});

app.put("/user", (req, res) => {

    res.send({lastName :"rohan"});
});

app.use( "/test", (req, res) => {
    res.send("namaste from the Pihu - test!!"); 
});


// app.use("/", (req, res) => {
//     res.send("Hello from the server!!");
    
// })


app.listen(3000, () =>{
    console.log("Server is successfully reading");
    
});




