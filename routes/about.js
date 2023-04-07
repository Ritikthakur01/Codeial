const express=require("express");
const router=express.Router();

const about_cnt=require('../controllers/about_controller')

router.get('/address',about_cnt.address);

module.exports=router;