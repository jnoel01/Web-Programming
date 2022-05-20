const bcrypt = require('bcrypt');
const mongoCollections = require('../config/mongoCollections');
const saltRounds = 10;
const users = mongoCollections.users;

module.exports = {
    // Returns array of all users in a collection
    async getAllUsers() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if (!userList) 
            throw 'Could not get all bands!';
        
        // Gets rid of ObjectID around ID Field
        for (i of userList)
            i._id = i._id.toString();
        
        if (userList.length == 0) {
            return [];
        }
        return userList; 
    },

    async createUser(username, password) {
        // Make username case-insensitive
        const usernameLower = username.toLowerCase();
        const userCollection = await users();

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

        // Not allow duplicate usernames in the system
        const allUsers = await this.getAllUsers();
        for (const user of allUsers) {
            if (usernameLower == user.username){
                throw "Username is already taken!";
            }
        }

        // Password must be valid string
        // Check that password has no empty spaces
        if (password != (password.replace(/\s+/g, ''))) 
            throw "Password can not have empty space!";

        // Check that the password length is at least 6
        if (password.length < 6)
            throw "Password must be at least 6 characters!";

        // Hash password using bcrypt
        const hash = await bcrypt.hash(password, saltRounds);
        let newUser = {
            username: username,
            password: hash
        };

        // Insert username and HASHED password into database
        const insertUser = await userCollection.insertOne(newUser);
        if (!insertUser.acknowledged || !insertUser.insertedId){
            throw "Could not add user!";
        } else {
            return { userInserted: true };
        }
    },

    async checkUser(username, password) {
        // Make username case-insensitive
        const usernameLower = username.toLowerCase();

        // Check if username and password are supplied
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


        const users = await this.getAllUsers();
        let foundUser;
        for (const user of users) {
            if (usernameLower == user.username) {
                foundUser = user;
            }
        }
        if (!foundUser) {
            throw "Either the username or password is invalid";
        }

        let comparePass = await bcrypt.compare(password, foundUser.password);
        if (comparePass){
            return { authenticated: true };
        } else {
            throw "Either the username or password is invalid! ";
        }
    }
};