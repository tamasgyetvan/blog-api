const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const User = require("../models/user")
const signupController = require("../controllers/signup")
const loginController = require("../controllers/login")
const blogController = require("../controllers/blog")
const jwt = require("jsonwebtoken")


function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"]
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, authData) => {

        if (err) {
            res.json({error: err,
                errorMessage: "An error occured when trying to send your request!"})
        } else {
            next()
        }
    })
    
}
//ADMIN ROUTES
//Authorization routes
router.post("/api/login", loginController.login_post)
router.post("/api/signup", signupController.signup_post)


//Post action routes
router.get("/api/queryposts", verifyToken, blogController.queryPosts)
router.post("/api/create_post", verifyToken, blogController.createPost)

router.put("/api/post/:id", verifyToken, blogController.updatePost)
router.delete("/api/delete_post/:id", verifyToken, blogController.deletePost)
module.exports = router;




