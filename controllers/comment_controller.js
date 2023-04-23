const Comment=require('../models/comment')
const Post=require('../models/posts')

module.exports.create=async function(req,res){
    const post=await Post.findById(req.body.post)
    if(!post){
        console.log("post doesn't exist")
        return;
    }
    else{
        const comment= await Comment.create({
                            comment:req.body.comment,
                            user:req.user._id,
                            post:req.body.post     
                        })
        if(!comment){
            req.flash("error","Comment is not added")
            return 
        }
        else{
            post.comments.push(comment)
            post.save()
            req.flash("success","Comment Added")
            return res.redirect("back")
        }
    }
}
module.exports.destroy=async function(req,res){
    const comment=await Comment.findById(req.params.id);
    if(!comment){
        console.log("Error while deleteing comments");
        return;
    }
    else{
        if(comment.user==req.user.id){

            let postId =comment.post;

            await Comment.findByIdAndDelete(req.params.id)

            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})

            req.flash("success","Comment deleted")
            return res.redirect('back')
        }
        else{
            return res.redirect('back')
        }
    }

}

