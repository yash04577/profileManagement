const dotenv = require("dotenv");
const mongoose = require("mongoose")

//getting database string username
const username = process.env.USERNAME.toLocaleLowerCase() + "04577";

const connectionString = `mongodb+srv://${username}:4577@cluster0.6yy3twg.mongodb.net/?retryWrites=true&w=majority`
mongoose.set("strictQuery", false);

mongoose.connect(connectionString)

.then(()=>{
    console.log("connection sucessfull")
})
.catch((err)=>{console.log("no connection " + err);})