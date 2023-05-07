const nodeMailer=require("../config/nodmailer");

module.exports.newCommentMail=(comment)=>{
   
    let mailHTML=nodeMailer.templateRender({comment:comment},"/comments/new_comment.ejs")

    nodeMailer.transporter.sendMail({
        from:"kittuthakur868@gmail.com",
        to:comment.user.username,
        subject:"comment published",
        html: mailHTML
    },(err,info)=>{
        if(err){
            console.log("Error on sending mail",err)
            return;
        }
        return;
    })
}