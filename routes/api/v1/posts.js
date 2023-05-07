const express=require("express");
const router= express.Router();
const passport=require("passport");

const post_api_cnt=require("../../../controllers/api/v1/posts_api")

router.get("/",post_api_cnt.index)
router.delete("/:id",passport.authenticate("jwt",{session:false}),post_api_cnt.delete)


module.exports=router;