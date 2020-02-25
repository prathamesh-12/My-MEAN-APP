const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log("HASH---   ", hash);
            const user = new User({
                email: req.body.email,
                password: hash
            });
            console.log(user);
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created successfully!!",
                        result: result
                    })
                }).catch(err => {
                    res.status(500).json({
                        message: "Error in creating user"
                    })
                })
        })
        .catch(err => console.log(err));
})

router.post('/login', (req, res, next) => {
    const loginEmail = req.body.email;
    let fetchedUser = null;

    User.findOne({ email: loginEmail })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'User not found!'
                })
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, fetchedUser.password)
        })
        .then(isPasswordValidated => {
            if(!isPasswordValidated) {
                return res.status(401).json({
                    message: 'Password Mismatch'
                })
            }

            const token = jwt.sign({
                email: fetchedUser.email,
                id: fetchedUser._id
            }, 'aa_11_bb_22_cc_33_abc_123_xyz_678_hello_secret', {
                expiresIn: '0.5h'
            })

            res.status(200).json({
                token: token,
                expiresIn: 1800
            });
        })
        .catch(err => console.log(err))

})

module.exports = router;