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
                res.json({
                        token: null,
                        errorMessage: "Server error"})
                return;
            }

            const user = await User.findOne({username: req.body.username})
            
            if (user && (await bcrypt.compare(req.body.password, user.password)) ) {
            const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: "15m"})                       
            res.json({
                user: user._id,
                token: token,
                errorMessage: null
            })} else if (!user) {
                res.json({
                token: null,
                errorMessage: "User not found"})
                } else {
                    res.json({token: null, errorMessage: "Incorrect password"})
                }} catch(error) {
                     res.json(error)
                }
        }]