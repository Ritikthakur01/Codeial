const Post=require('../models/posts')
const Comment=require('../models/comment')

module.exports.create=async function(req,res){
    const post=await Post.create({
        content:req.body.content,
        user:req.user._id
    })
    if(!post){    
          console.log("error during Post creation")
             return;
        }
        else{
            if(req.xhr){

                return res.status(200).json({                  
                    data:{
                        post:post
                    },
                    message:"post is uploaded"
                })
            }
            req.flash("success","Post uploaded")
            return res.redirect('back')
        }  
}


module.exports.destroy=async function(req,res){
    console.log(req.query.id)
    const post=await Post.findById(req.query.id)
    if(!post){
        console.log("error post is not fount while deleting post")
        return;
    }
    else{
        if(post.user==req.user.id){
            await Post.findByIdAndDelete(req.query.id)

            await Comment.deleteMany({post:req.query.id})

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.query.id,            
                    },
                    message:"Post deleted"
                })
            }

            req.flash("success","Post deleted")
            return res.redirect("back");
        }
    }
}