const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy

const User=require("../models/users")

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'username'
},   // finding user
    async function(username,password,done){
        const user= await User.findOne({username:username});
        if(!user || user.password!==password){
            console.log("Invalid Username/Password")
            return done(null,false);
        }
        else{
            return done(null,user)
        }
    }
))

// serializing the user to decide which key is being kept in cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
})

// deserialing the user from the key in cookies

passport.deserializeUser(async (id,done)=>{
    const user=await User.findById(id);
    if(!user){
        return done("Error in finding user");
    }
    else{
        return done(null,user)
    }
})

// check is user authenticate or not 
passport.checkAuthentication=function(req,res,next){
    // if user is authenticate ,next function--  pass the request to controller function
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/user/sign-in");
}

// set user to views
passport.setAuthenticatedUserforView=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookies and we are just sends this to the locals for the views.
        res.locals.user=req.user
    }
    next()
}

//exporting passport
module.exports= passport;

