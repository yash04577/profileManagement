const express = require("express");
const app = express();
const port = process.env.PORT || 8000

app.get("/", (req, res)=>{
    res.send("welcome to backend home page");
})

app.listen(port, ()=>{
    console.log(`listing at port ${port}`);
})