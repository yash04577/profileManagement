const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("welcomr to router home page");
})

module.exports = router;