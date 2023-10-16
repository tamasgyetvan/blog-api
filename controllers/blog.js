const { validationResult } = require("express-validator")
const Post = require("../models/post")
const asyncHandler = require("express-async-handler")


exports.queryPosts = async(req, res, next) => {
    const posts = Post.find({}, "title").exec()
    res.json(posts)
}

exports.createPost = [
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
            res.json(errors.array())
            return;
        } else {
            const newPost = new Post({
                title: req.body.title,
                text: req.body.content,
                author: req.body.user
            })

            await newPost.save()
            res.json("Post created")
        }
        
        
    })

]

exports.deletePost = async(req, res, next) => {
    res.json("Blog delete post request")
}

exports.updatePost = async(req, res, next) => {
    res.json("Blog update post request")
}