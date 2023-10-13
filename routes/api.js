const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const User = require("../models/user")
const signupController = require("../controllers/signup")
const loginController = require("../controllers/login")

//ADMIN ROUTES
//Index page with login and register
router.get("/api/admin/", (req, res) => {
    res.send("Admin index page")
})


//Authorization routes
router.post("/api/login", loginController.login_post)

router.post("/api/logout")

router.post("/api/signup", signupController.signup_post)

router.post("/")

module.exports = router;




