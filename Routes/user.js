const express=require('express');
const router=express.Router();

const {handleUserSignUp}=require("../controller/user");
const {handleUserLogin}=require("../controller/user")

router.post('/',handleUserSignUp);
router.post('/login',handleUserLogin);


module.exports=router;