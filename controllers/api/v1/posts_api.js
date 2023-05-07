const Post = require("../../../models/posts")

const Comment = require("../../../models/comment")

module.exports.index = async function (req, res) {

    const post = await Post.find({})
        .populate("user")
        .populate({
            path: "comments",
            populate: {
                path: 'user'
            }
        })

    return res.json(200, {
        message: "List of posts",
        data: {
            posts: post
        }
    })
}

module.exports.delete = async function (req, res) {

    try {
        const post=await Post.findById(req.params.id)
        
        if(post.user==req.user.id){
            await Post.findByIdAndDelete(req.params.id)

            await Comment.deleteMany({post:req.params.id})

            return res.json(200,{
                message: "Post has been deleted successfully"
            })
    }
        else{
            return res.json(422,{
                message: "You can't delete the post"
            })
        }
    }
    catch (err) {
        return res.json({
            message:`Error in deleting post through api ${err}`
        })
    }
}