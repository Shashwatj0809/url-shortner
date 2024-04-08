const jwt=require("jsonwebtoken");
const secret="sha@0809"

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    })
   
}

function getUser(id){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }

}
module.exports={
    setUser,
    getUser,
}
