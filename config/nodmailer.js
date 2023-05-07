const nodeMailer=require('nodemailer');                             //things covering for send mail are
const ejs=require("ejs");
const path= require("path");
                                                                    // 1 nodemailer, 2 congif, 3 mailers file, 4    templates

//transporter is a object which will be connect with nodemailer later.  
// transporter helps to sends email  . this define hows the commuiation is going to take place.                              
let transporter=nodeMailer.createTransport({
   
    host:"smtp.ethereal.email",
    port:587,
    secure:false,   //because we dont going to use two factor security 
    auth:{
        user:"davon.metz@ethereal.email",
        pass:"kNz5pgMyUz2gVZNuGX"
    }
})

//degining we are using ejs , or template render engine.
// templateRender helps whenever we going to send html email where the file is placed in the mailer folder inside views

let  templateRender= (data,relativePath)=>{ // relativePth is a path from where email is to be sent.
    let mailHTML;

    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,       // data is the context like name that is to be fullfilled in ejs file 
        function(err, template){   //templte compose data and path;
            if(err){
                console.log("Error is found while rendering templates for emails",err)
                return
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,    // from there we sends email to mailers folder
    templateRender:templateRender,
}
