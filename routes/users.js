const express=require('express');
const router=express.Router();
const passport=require('passport');
const users_cnt=require('../controllers/users_controller')


router.get('/profile/:id',passport.checkAuthentication,users_cnt.profile);

router.get('/sign-in',users_cnt.signin);
router.get('/sign-up',users_cnt.signup);

router.post('/create', users_cnt.create);

router.post('/update/:id',passport.checkAuthentication,users_cnt.update);

// use passport as a middleware to authenticate       (below 'local' means the strategy.)
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:"/user/sign-in"
}),users_cnt.create_session)

router.get('/sign-out',users_cnt.destroySession)

//route-> /auth/google is given by passport automaticly
router.get('/auth/google',passport.authenticate('google',{
    scope:["profile","email"]
}))

router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:"/user/sign-in"
}),users_cnt.create_session)


module.exports=router;