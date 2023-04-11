const passport = require("passport");
const User=require("../models/users");

// rendering profile page
module.exports.profile=function(req,res){
    if(req.isAuthenticated()){
        return res.render('profile',{title:"Profile Page"})
    }
    return res.redirect('/')
}


// rendering signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user_signin',{title:"Sign-in page"})
}

// rendering signup page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user_signup',{title:"Sign-up page"})
}

//getting user data and store to database.
module.exports.create=async function(req,res){
    // if(req.body.password !== req.body.confirm_password){
    //     return res.redirect("back")
    // }
    // else{
    //     const enteredUsername=req.body.username;
    //     const ExistedUser=await User.findOne({username:enteredUsername});
    //     if(ExistedUser){
    //         return res.redirect("/user/sign-in");
    //     }
    //     else{
    //         const createdUser=await User.create(req.body)
    //         if(!createdUser){
    //             console.log("error during user creation")
    //             return;
    //         }
    //         else{
    //             res.cookie('id',createdUser._id)
    //             return res.redirect('/user/sign-in')
    //         }  
    //     } 
    // }

    return res.redirect('/user/sign-in');
}

// creating session , signin user and redirct to home page

    // module.exports.create_session=async function(req,res){
    //     const enteredUsername=req.body.username;
    //         const checkExistedUser=await User.findOne({username:enteredUsername});
    //         if(!checkExistedUser){
    //             return res.redirect("back");
    //         }
    //         else{
    //             const checkPassword=await User.findOne({password:req.body.password});
    //             if(!checkPassword){
    //                 return res.redirect("back");
    //             }
    //             else{
    //                 return res.redirect("/")
    //             }
    //         }
    // }

module.exports.create_session=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout((err)=>{
        if(err){
        console.log(err)
        }
        console.log("successfully logout and destroy session data")
    }
    );
    return res.redirect('/');
}