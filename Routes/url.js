const express= require("express");
const router=express.Router();

const {GenerateNewURL}= require ("../controller/url");

router.post("/",GenerateNewURL);

module.exports= router;