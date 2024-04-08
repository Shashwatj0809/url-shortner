const express= require("express");
const URL= require("./model/url");
const ejs=require("ejs");
const path=require("path");
const staticRoute=require("./Routes/staticRouter");
const {connectToMongoDB}= require("./Connect");
const urlRoute= require("./Routes/url");
const userRoute=require("./Routes/user");
const cookieParser=require("cookie-parser");
const {restrictToLoggedinUse,checkAuth}=require('./middleware/auth')


const app=express();
const PORT=8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));



app.get("/url/:shortid", async(req,res)=>{
    const shortid= req.params.shortid;
    const entry= await URL.findOneAndUpdate(
        {
            shortid
        },
        {
            $push:{
                visitHistory:{
                    timestamp:Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectUrl);
    
}
);
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.json());//middleware

app.use("/",checkAuth, staticRoute);
app.use("/user",userRoute);

app.use("/url", restrictToLoggedinUse, urlRoute);

app.listen(PORT,()=> console.log(`Server started at port ${PORT}`));
