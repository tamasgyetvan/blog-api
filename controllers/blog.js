const Post = require("../models/post")


exports.queryPosts = async(req, res, next) => {
    res.json("Blog get posts from DB request")
}

exports.createPost = async(req, res, next) => {
    res.json("Blog create post request")
}

exports.deletePost = async(req, res, next) => {
    res.json("Blog delete post request")
}

exports.updatePost = async(req, res, next) => {
    res.json("Blog update post request")
}