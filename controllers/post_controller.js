const Post = require('../models/posts')
const Comment = require('../models/comment')

module.exports.create = async function (req, res) {
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        }) 
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user')
            return res.status(200).json({
                data: {
                    posts: post
                },
                message: "post is uploaded"
            })
        }
        req.flash("success", "Post uploaded")
        return res.redirect('back')
    }catch(err){
        console.log(err)
        return res.redirect("back");
    }
}

module.exports.destroy = async function (req, res) {
    const post = await Post.findById(req.query.id)
    if (!post) {
        console.log("error post is not fount while deleting post")
        return;
    }
    else {
        if (post.user == req.user.id) {
            await Post.findByIdAndDelete(req.query.id)

            await Comment.deleteMany({ post: req.query.id })

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.query.id,
                    },
                    message: "Post deleted"
                })
            }

            req.flash("success", "Post deleted")
            return res.redirect("back");
        }
    }
}