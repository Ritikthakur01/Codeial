const User=require("../../../models/users");
const jwt= require("jsonwebtoken"); 
module.exports.create_session=async function(req,res){
    try{
        let user=await User.findOne({username:req.body.username})
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invaild username/password"
            })
        }
        return res.json(200,{
            message:"Sign In successfully here is the token below",
            data:{
                token: jwt.sign(user.toJSON(),"codeial",{expiresIn:"100000"})  // three argument required in jwt sign function 1st is for creating token 2nd if for decrypt key ,3rd if for  expiry in mm.
            }
        }) 
    }catch(err){
        return res.json(500,{
            message:"Error found while sign in with json",
            error:err
        })
    }
}