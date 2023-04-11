const express=require('express');
const router=express.Router();
const passport=require('passport');
const users_cnt=require('../controllers/users_controller')

router.get('/profile',passport.checkAuthentication,users_cnt.profile);

router.get('/sign-in',users_cnt.signin);
router.get('/sign-up',users_cnt.signup);

router.post('/create', users_cnt.create)

// use passport as a middleware to authenticate       (below 'local' means the strategy.)
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:"/user/sign-in"
}),users_cnt.create_session)

router.get('/sign-out',users_cnt.destroySession)

module.exports=router;