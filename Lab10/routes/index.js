const user = (require('./users'));
const path = require("path");


const constructorMethod = (app) => {
    app.use('/', user);

    app.use('*', (req, res) =>{
        res.sendStatus(404);
    });
}

module.exports = constructorMethod