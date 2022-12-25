const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');

const envPath = path.join(__dirname, "../config.env");
require('dotenv').config({ path:envPath });


//this is our document model

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required:true
    },

    middleName : {
        type:String
    },

    lastName : {
        type:String,
        required:true
    },

    email : {
        type:String,
        required:true
    },

    password : {
        type:String,
        required:true
    },

    role : {
        type:String,
        required:true
    },

    department : {
        type:String
    },

    createdAt : {
        type : Date,
        default: Date.now
    },

    tokens : [
        {
            token : {
                type : String
            }
        }
    ]

})

//hashing our password

userSchema.pre('save', async function(next){
    
    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password, 12);
        console.log("pre method")
    }
    
    next();

})


//generating token

userSchema.methods.generateAuthToken = async function(){
    try{

        console.log("key = ", process.env.SECRET_KEY);
        let token = jwt.sign({ _id : this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }

    catch(err){
        console.log("on token " + err)
    }
}


const User = mongoose.model("USER", userSchema);
module.exports = User;