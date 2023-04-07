const express=require('express');
const router=express.Router();

const users_cnt=require('../controllers/users_controller')

router.get('/profile',users_cnt.profile);

module.exports=router;