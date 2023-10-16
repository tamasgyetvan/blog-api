const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const User = require("../models/user")
const signupController = require("../controllers/signup")
const loginController = require("../controllers/login")
const blogController = require("../controllers/blog")

//ADMIN ROUTES
//Authorization routes
router.post("/api/login", loginController.login_post)

router.post("/api/logout")

router.post("/api/signup", signupController.signup_post)


//Post action routes
router.get("/api/queryposts", blogController.queryPosts )
router.post("/api/create_post", blogController.createPost )
router.put("/api/update_post", blogController.updatePost)
router.delete("/api/delete_post", blogController.deletePost)
module.exports = router;




