const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local')

const comment_cnt=require('../controllers/comment_controller');



router.post('/create',comment_cnt.create)

router.get('/destroy/:id',passport.checkAuthentication,comment_cnt.destroy)



module.exports=router;