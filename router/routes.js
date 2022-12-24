const { application, json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../model/userShema");


router.get("/", (req, res) => {
    res.send("welcomr to router home page");
})

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

module.exports = router;