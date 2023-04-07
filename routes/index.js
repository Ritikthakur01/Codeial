const express=require('express');

const router= express.Router();
const home_cnt=require('../controllers/home_controller')

router.get('/',home_cnt.home);
router.use('/user',require('./users'))
router.use('/about',require('./about'))

//for any further route access from here :->
// router.use('routeName',require('routeFileName')) 

module.exports=router;