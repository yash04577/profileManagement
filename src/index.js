const dotenv = require("dotenv");
dotenv.config({path: "../config.env"});
const express = require("express");
const app = express();
const port = process.env.PORT || 8000
require("../DB/connection");


//redirecting to router to check and process the request
app.use(require("../router/routes"))

app.get("/", (req, res)=>{
    res.send("welcome to backend home page");
})

app.listen(port, ()=>{
    console.log(`listing at port ${port}`);
})