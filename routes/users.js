const express=require('express');
const router=express.Router();

const users_cnt=require('../controllers/users_controller')

router.get('/profile',users_cnt.profile);

router.get('/signin',users_cnt.signin);
router.get('/signup',users_cnt.signup);

router.post('/create', users_cnt.create)

router.post('/create-session', users_cnt.create_session)

module.exports=router;