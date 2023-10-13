const User = require("../models/user")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const passport = require('passport');
const user = require("../models/user");

exports.signup_post =[
    body("username")
        .isLength({min: 4}).withMessage("Username should contain at least 4 characters.")
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

            if (userExists) {
                res.status(400).json("User already exists.")
            } else if (!errors)  {
                res.status(400).json(errors)
            } else {                
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword
                })    
                await user.save()
                res.status(200).json("User saved successfully")
            }

            
        })
    })
        
    ]
