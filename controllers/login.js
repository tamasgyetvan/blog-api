const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")

 exports.login_post = [
    body("username")
        .isLength({min: 4}).withMessage("Username should contain at least 4 characters.")
        .trim()
        .escape(),    
    body("password")
        .notEmpty()
        .trim()
        .escape(),
    

    asyncHandler((async(req, res, next) => {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json({token: null, errorMessage: "Server error!"})
            } else {
                const user = await User.findOne({username: req.body.username})
                if (user && (await bcrypt.compare(req.body.password, user.password)) ) {
                    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: "15m"})                       
                    res.json({
                        user: user._id,
                        token: token,
                        errorMessage: null
                    })
                } else {
                    res.json({
                        token: null,
                        errorMessage: "Incorrect username or password!"})
                } 
            }
    }))]