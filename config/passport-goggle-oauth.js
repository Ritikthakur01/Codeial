const passport= require("passport");
const Goggle_Oauth2_strategy=require("passport-google-oauth").OAuth2Strategy;
const crypto= require("crypto"); // this lib is used to create random passwords
const User=require("../models/users");

//tell passport to use new strategy for google login
passport.use(new Goggle_Oauth2_strategy({
    clientID:"969697791479-soufu4ajt140ub4lc2n09uk7g9aa2beo.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback"
},async function(accessToken,refreshToken,profile,done){
    try{
        //find a user
        const user=await User.findOne({username:profile.emails[0].value})
        if(user){
            //if found,  set this user as req.user
            return done(null,user)
        }else{
            try{
                //if not found, create user and set it as req.user.
                const user=await User.create({
                    name:profile.displayName,
                    username:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString("hex")
                })
                
                if(user){
                    return done(null,user);
                }
            }
            catch(err){
                console.log("Error while creating user when user does not found in google",err);
                return;
            }
        }
    }catch(err){
        console.log(`Error in goggle oauth strategy ${err}`)
        return;
    }
}
))