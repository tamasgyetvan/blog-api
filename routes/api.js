const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const User = require("../models/user")

//ADMIN ROUTES
//Index page with login and register
router.get("/api/admin/", (req, res) => {
    res.send("Admin index page")
})

//Authorization routes
router.post("/api/login")

router.post("/api/logout")

router.post("/api/signup")

module.exports = router;




