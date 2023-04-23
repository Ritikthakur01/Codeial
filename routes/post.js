const express=require("express")
const routes= express.Router();
const passport=require('../config/passport-local')

const post_cnt=require("../controllers/post_controller");

// passport.checkAuthentication will not allow to do post when he doesn't sing in even he do some feddle by  using HTML 
routes.post('/create',passport.checkAuthentication,post_cnt.create)

routes.get('/destroy/',passport.checkAuthentication,post_cnt.destroy)


module.exports=routes