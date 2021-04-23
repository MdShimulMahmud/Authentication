const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { regValidation, loginValidation } = require('../model/validation');


const User = require('../model/User');


router.post('/register', async(req, res) => {
    const { error } = regValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // check if the user already exists in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists!');

    // hash password using bcryptjs
    const salt = await bcrypt.genSalt(10);

    const HashedPassword = await bcrypt.hash(req.body.password, salt);


    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: HashedPassword

    });
    try {
        const savedUser = await newUser.save();
        // res.status(200).save(savedUser);
        // user data fething 
        // res.send(savedUser);
        res.send({ user: user._id });


    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async(req, res) => {
    // validator 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // check if the user exists in the database???
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist!');
    // if password is correct

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password does not match!');

    // res.send('Login successful!');

    // access any other time
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);

    res.header('auth-token', token).send(token);


});


module.exports = router;