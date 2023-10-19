const { validationResult, body } = require("express-validator")
const Post = require("../models/post")
const asyncHandler = require("express-async-handler")
const  jwt  = require("jsonwebtoken")

exports.queryPosts = async(req, res, next) => {
        const posts = await Post.find({}).exec()
        res.json(posts)
}

exports.createPost =  [
    body("username")
        .isLength({max: 50})
        .trim()
        .escape(),
    body("text")
        .isLength({max: 50})
        .trim()
        .escape(),
    body("user")
        .trim()
        .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.json({errorMessage: "Error when creating Post"})
            
        } else {
            const newPost = new Post({
                title: req.body.title,
                text: req.body.content,
                author: req.body.user
            })
            await newPost.save()
            res.json({successMessage: "Post created"})
        }        
    })
] 

exports.deletePost = async(req, res, next) => {
    res.json("Blog delete post request")
}

exports.updatePost = async(req, res, next) => {
    res.json("Blog update post request")
}