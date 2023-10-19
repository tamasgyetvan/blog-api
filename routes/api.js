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
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.SECRET, (err) => {
            if (err) {
                res.sendStatus(500).json({error: err,
                    errorMessage: "An error occured when trying to send your request!"})
            } else {
                next()
            }
        })
    } else {
        res.json({
            errorMessage: "Bad auth"
        })
    }
    
}
//ADMIN ROUTES
//Authorization routes
router.post("/api/login", loginController.login_post)
router.post("/api/signup", signupController.signup_post)


//Post action routes
router.get("/api/queryposts", verifyToken, blogController.queryPosts)
router.post("/api/create_post", verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if(err) {
            res.json({errorMessage: "An error occured when trying to send your request!"})
        } else {
            blogController.createPost
        }
    })
})
router.put("/api/update_post", verifyToken, blogController.updatePost)
router.delete("/api/delete_post", verifyToken, blogController.deletePost)
module.exports = router;




