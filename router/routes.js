const { application, json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../model/userShema");
const bcrypt = require("bcrypt");


router.get("/", (req, res) => {
    res.send("welcomr to router home page");
})

//handling singup process
router.post("/signup", async (req, res) => {

    try {
        const { firstName, middletName, lastName, email, password, cpassword, role, department } = req.body;

        //checking all mandtory field is given or not
        if (!firstName || !lastName || !email || !password || !role || !department) {
            res.statusCode = 422;
            res.json({ message: "please fill all mandatory fields" });
        }

        //matching password and confirm password is same or not
        if (password !== cpassword) {
            res.statusCode = 422;
            res.json({ message: "password and confirm password must be same" });
        }

        //sending request to register user

        else{

            //checkig if user is already present or not
            const isFound = await User.findOne({email:email});

            if(!isFound){
                const user = new User({ firstName, middletName, lastName, email, password, role, department });
                const response = await user.save();
                console.log(response);
                res.json({ message: "reistered sucessfully" });
                res.send("registering user");
            }

            else{
                res.statusCode = 422;
                res.json({ message: "user already present" });
            }

        }
    }

    catch (err) {
        console.log("this is a error ", err);
    }

})


//handling login process

router.post("/signin", async (req, res)=>{

    try{

        let token;
        const {email, password} = req.body;

        //checkind if all details are filled or not
        if(!email || !password){
            res.statusCode = 422;
            res.json({message:"please fill all fields"})
        }

        const isFound = await User.findOne({email:email});

        if(!isFound){
            res.statusCode = 422;
            res.json({message:"no user found"});
        }

        else{
            //checking detail are correct or not
            console.log(isFound);
            const comparePasword = await bcrypt.compare(password, isFound.password);

            if(comparePasword){

                //generating jwt
                token = await isFound.generateAuthToken();

                //generatin cookie
                res.cookie('jwtoken', token, {
                    // expires : new Date(Date.now() + 60000),
                    httpOnly:true
                });
                console.log(token);
                res.statusCode = 200;
                res.json({message:"login successfull"});
                console.log(isFound);
            }

            else{
                res.statusCode = 422;
                res.json({message:"invalid details"});
            }
        }
        // console.log(req.body);
        // res.json("logged in");
    }

    catch(err){
        console.log("error on signin ", err);
    }
  
})

module.exports = router;