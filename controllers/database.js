const { validationResult, body } = require("express-validator")
const Post = require("../models/post")
const asyncHandler = require("express-async-handler")

exports.queryPosts = async(req, res, next) => {
        const posts = await Post.find({}).populate("author", "username").exec()
        res.json(posts)
}

exports.createPost =  [
    body("username")
        .isLength({max: 50})
        .trim()
        .escape(),
    body("text")
        .trim()
        .escape(),
    body("user")
        .trim()
        .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.json({errorMessage: "An error occured. Please try again!"})  
        }
        const newPost = new Post({
            title: req.body.title,
            text: req.body.content,
            author: req.body.user
        })
        await newPost.save()
        res.json({successMessage: "Post created", newPost: newPost})      
    })
] 

exports.deletePost = async(req, res, next) => {
    const itemToDelete = await Post.findById(req.params.id).exec()
    if (!itemToDelete) {
        res.json({errorMessage: "An error occured. Please try again!"})        
    } 
    await Post.findByIdAndDelete(req.params.id).exec()
    res.json({successMessage: "Post successfully deleted!"})
    
}

exports.updatePost = [
    body("username")
        .isLength({max: 50})
        .trim()
        .escape(),
    body("text")
        .trim()
        .escape(),
    body("user")
        .trim()
        .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.json({errorMessage: "An error occured. Please try again!"})
        }
        const postDetails = {
            title: req.body.title,
            text: req.body.content,
            author: req.body.author
        }
        await Post.findByIdAndUpdate(req.params.id, postDetails)            
        res.json({successMessage: "Post updated successfully!"})              
    })
] 
