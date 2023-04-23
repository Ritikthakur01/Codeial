const passport = require("passport");
const User=require("../models/users");
const fs=require('fs')
const path=require("path")
// rendering profile page
module.exports.profile=async function(req,res){
    if(req.isAuthenticated()){
     
        const user=await User.findById(req.params.id)

        return res.render('profile',{title:"Profile Page",
            profile_user:user
    })
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
    if(req.body.password !== req.body.confirm_password){
        req.flash("error","Password mismatched")
        return res.redirect("back")
    }
    else{
        const enteredUsername=req.body.username;
        const ExistedUser=await User.findOne({username:enteredUsername});
        if(ExistedUser){
            req.flash("info","User already exists")
            return res.redirect("/user/sign-in");
        }
        else{
            const createdUser=await User.create(req.body)
            if(!createdUser){ 
                console.log("error during user creation")
                return;
            }
            else{
                req.flash("success","Congratulation, You have successfully signed up")
                return res.redirect('/user/sign-in')
            }  
        } 
    }

    // return res.redirect('/user/sign-in');
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
    req.flash("success","logged in successfully")
    return res.redirect('/');
} 

module.exports.destroySession=function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err)
        } 
        else{
            req.flash("success","logged out successfully")
            return res.redirect('/');
        }   
    }
    );  
}
module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     const update_user=await User.findByIdAndUpdate(req.params.id,req.body)
    //     if(update_user){
    //         req.flash("success","Profile Updated")
    //         return res.redirect("back");
    //     }
    //     else{
    //         return res.status(401).send("Unauthorized")
    //     }
    // }
    if(req.user.id==req.params.id){
        try{
            let update_user=await User.findById(req.params.id);
            User.uploadAvatar(req,res,function(err){
                if(err){
                    console.log(err);
                }
                User.name=req.body.name;
                User.username=req.body.username;
                if(req.file){
                    if(update_user.avatar){
                            fs.unlinkSync(path.join(__dirname+".."+update_user.avatar))
                    }
                    // this is saving the path of uploaded file into the avatar field in the user;
                    update_user.avatar=User.avatarPath+"/"+ req.file.filename;
                }
                update_user.save();
                res.redirect("back");
            })
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        req.flash('error',"unauthorized")
        return res.status(401).send("Unauthorized")
    }
}
