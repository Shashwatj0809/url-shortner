const URL= require("../model/url");
const shortid = require('shortid');

async function GenerateNewURL(req,res){
    const Body=req.body;
    if(!Body.url) return res.status(400).json({error:"url not found"})
    
    const shortID=shortid();
    await URL.create({
        shortid:shortID,
        redirectUrl:Body.url,
        visitHistory:[],
        createdBy:req.user._id,

    })
    return res.render("home",{
        id:shortID
        
    })
}
module.exports={
    GenerateNewURL
}