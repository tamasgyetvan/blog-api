const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

 exports.login_post = [
    body("username")
        .isLength({min: 4}).withMessage("Username should contain at least 4 characters.")
        .trim()
        .escape(),    
    body("password")
        .notEmpty()
        .trim()
        .escape(),
    
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                        token: null,
                        errorMessage: "Server error"})
            }

            const user = await User.findOne({username: req.body.username})
            
            if (user && (await bcrypt.compare(req.body.password, user.password)) ) {
            const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: "5m"})                       
            res.status(200).json({
                user: user._id,
                token,
                errorMessage: null
            })
        } else if (!user) {
            res.status(400).json({
                token: null,
                errorMessage: "User not found"})
        }
        } catch(error) {
            res.json(error)
        }
    }
    /* asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors)
        } 

        const user = await User.findOne({username: req.body.username})      
        if (user && (await bcrypt.compare(req.body.password, user.password)) ) {
            jwt.sign({id: user._id}),
            process.env.SECRET,
            {
                expiresIn: "5m"
            }
            user.token = token;
            user.password = undefined;

            //send token to cookie
            const options = {
                expires: new Date(Date.now() + 0.00347222 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).cookie("token", token, options).json({
                token,
                user
            }

            )

        }
    }) */
 ]