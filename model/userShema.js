const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

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
    }

})

//hashing our password

userSchema.pre('save', async function(next){
    
    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password, 12);
        console.log("pre method")
    }
    
    next();

})

// //adding message

// userSchema.methods.addMessage = async function(message){

//     try{
//         console.log("inside schema ", message );
//         this.messages = this.messages.concat({message:message});
//         await this.save();

//     }

//     catch(err){
//         console.log("mess schmea err " , err);
//     }
// }


// //generating token

// userSchema.methods.generateAuthToken = async function(){
//     try{

//         let token = jwt.sign({ _id : this._id }, process.env.SECRET_KEY)
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;

//     }

//     catch(err){
//         console.log("on token " + err)
//     }
// }


const User = mongoose.model("USER", userSchema);
module.exports = User;