const passport=require("passport");
const JwtStrategy= require("passport-jwt").Strategy;
// importing a module which will help us to extract jwt from header
const Extract_Jwt=require("passport-jwt").ExtractJwt;

const User= require("../models/users");

let opts={
    jwtFromRequest:Extract_Jwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"codeial"
}

passport.use(new JwtStrategy(opts,async function(jwtPayLoad,done){
    try{
        const user=await User.findById(jwtPayLoad._id);
        if(user){
            done(null,user)
        }else{
            done(null,false)
        }
    }
    catch(err){
        console.log("Error",err)
    }
}))

module.exports=passport;