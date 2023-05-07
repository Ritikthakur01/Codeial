const express= require("express");
const router=express.Router();

const user_api_cnt=require("../../../controllers/api/v1/users_api");

router.post("/create_session", user_api_cnt.create_session);

module.exports=router;