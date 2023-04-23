const Post=require('../models/posts')
const User=require("../models/users")

module.exports.home=async function(req,res){
    try{
// populating the user for each posts by user id (that was inside the user object)
    const posts= await Post.find({})
    .sort('-createdAt')
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    })
    
    const all_users=await User.find({})
        return res.render('home',{
            title:"Codeial/Home",
            posts_list:posts,
            all_users:all_users
        })
    }
    catch(err){
        console.log("Error",err)
        return;
    }
}
