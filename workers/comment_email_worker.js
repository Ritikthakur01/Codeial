const queue=require("../config/kue")
const comment_mail=require("../mail/comment_mailer")

queue.process("emails", function(job,done){
    comment_mail.newCommentMail(job.data)
    done();
})