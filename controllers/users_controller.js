const User=require("../models/users");

// rendering profile page
module.exports.profile=async function(req,res){
    if(req.cookies.id){
        const user=await User.findById(req.cookies.id)
        if(user){
            return res.render("profile",{
                title:"Profile Page",
                name:user.name,
                email:user.username
            })
        }
        else{
            return res.redirect("/user/signin")
        }
    }   
    else{
        return res.redirect("/user/signin")
    } 

}


// rendering signin page
module.exports.signin=function(req,res){
    return res.render('user_signin',{title:"Sign-in page"})
}

// rendering signup page
module.exports.signup=function(req,res){
    return res.render('user_signup',{title:"Sign-up page"})
}

//getting user data and store to database.
module.exports.create=async function(req,res){
    if(req.body.password !== req.body.confirm_password){
        return res.redirect("back")
    }
    else{
        const enteredUsername=req.body.username;
        const ExistedUser=await User.findOne({username:enteredUsername});
        if(ExistedUser){
            return res.redirect("/user/signin");
        }
        else{
            const createdUser=await User.create(req.body)
            if(!createdUser){
                console.log("error during user creation")
                return;
            }
            else{
                res.cookie('id',createdUser._id)
                return res.redirect('/user/signin')
            }  
        } 
    }
}

// creating session , signin user and redirct to profile page

module.exports.create_session=async function(req,res){
    const enteredUsername=req.body.username;
        const checkExistedUser=await User.findOne({username:enteredUsername});
        if(!checkExistedUser){
            return res.redirect("back");
        }
        else{
            const checkPassword=await User.findOne({password:req.body.password});
            if(!checkPassword){
                return res.redirect("back");
            }
            else{
                return res.redirect("/user/profile")
            }
        }
}