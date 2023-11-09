const User = require("../models/user")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")

exports.signup_post =[
    body("username")
        .isLength({min: 5}).withMessage("Username should contain at least 5 characters.")
        .trim()
        .escape(),
    body("password", "Password is required!")
        .notEmpty()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .trim()
        .escape(),
    body("confirmPassword")
        .custom((value, {req}) => value === req.body.password)
        .withMessage("Password mismatch!")
        .trim()
        .escape(),

    asyncHandler(async(req, res, next) => {

        bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
            const errors = validationResult(req)
            const userExists = await User.findOne({username: req.body.username})

            if (!errors.isEmpty()) {
                res.json({errorMessage: "Server error!" })
            } else if (userExists)  {
                res.json({errorMessage: "Username already exists! Please choose another one."})
            } else {                
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword
                })
                await user.save()
                res.json({successMessage: "Registration was successful! Please log in."})
            }            
        })
    })
        
]
