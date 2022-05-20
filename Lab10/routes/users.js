const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userData = require('../data/user');
const data = require('../data')
const users = data.user;


router.get('/', async(req, res) => {
    if(req.session.user) {
        res.redirect("private");
    } else {
        res.render("../views/pages/loginPage.handlebars");
    }
});

router.get('/signup', async(req, res) => {
    if(req.session.user) {
        res.redirect("private");
    }else{
        res.render("../views/pages/signup.handlebars");
    }
});

router.post('/signup', async (req, res) => {

    const username = req.body.username;
    let password = req.body.password;

    try {
    // Make username case-insensitive
    const usernameLower = username.toLowerCase();

    // Check that username & password is supplied
    if (!usernameLower) 
        throw "Username must be supplied!";
    if (!password)
        throw "Password must be supplied!";

    // Check that username has no empty spaces
    // Got RegEx from stack overflow
    if (usernameLower != (usernameLower.replace(/\s+/g, ''))) 
        throw "Username can not have empty space!";

    // Check that username contains only alphanumeric chracters
    if (/[^a-zA-Z0-9]/.test(usernameLower))
        throw "Username can only contain alphanumeric characters!";
    
    // Check that username is at least 4 characters long
    if (usernameLower.length < 4)
        throw "Username must be more than 4 character long!";

        // Password must be valid string
        // Check that password has no empty spaces
        if (password != (password.replace(/\s+/g, ''))) 
            throw "Password can not have empty space!";

        // Check that the password length is at least 6
        if (password.length < 6)
            throw "Password must be at least 6 characters!";


        let user = await users.createUser(username, password);
        if (user.userInserted == true) {
            res.redirect('/');
        } else {
            res.status(500).json("Internal Server Error");
            return;
        }
    } catch (e) {
        res.status(400).render("../views/pages/signup", { message : e });
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
    // Make username case-insensitive
    const usernameLower = username.toLowerCase();

    // Check that username & password is supplied
    if (!usernameLower) 
        throw "Username must be supplied!";
    if (!password)
        throw "Password must be supplied!";

    // Check that username has no empty spaces
    // Got RegEx from stack overflow
    if (usernameLower != (usernameLower.replace(/\s+/g, ''))) 
        throw "Username can not have empty space!";

    // Check that username contains only alphanumeric chracters
    if (/[^a-zA-Z0-9]/.test(usernameLower))
        throw "Username can only contain alphanumeric characters!";
    
    // Check that username is at least 4 characters long
    if (usernameLower.length < 4)
        throw "Username must be more than 4 character long!";

        // Password must be valid string
        // Check that password has no empty spaces
        if (password != (password.replace(/\s+/g, ''))) 
            throw "Password can not have empty space!";

        // Check that the password length is at least 6
        if (password.length < 6)
            throw "Password must be at least 6 characters!";

        let user = await users.checkUser(username, password);
        if (user.authenticated === true) {
            req.session.user = username;
            res.redirect('/private');
        } else {
            res.status(400).json("No Provided username and/or password!");
            return;
        }
    } catch (e) {
        res.status(400).render("../views/pages/loginPage", { message : e });
    }
});

router.get('/private', async(req, res) => {
    if(req.session.user) {
        res.render("../views/pages/private", { username: req.session.user });
    } else {
        res.render("pages/loginPage");
    }
});

router.get('/logout', async(req, res) => {
    res.clearCookie("AuthCookie");
    res.render("../views/pages/logoutPage")
});


module.exports = router;