const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


configRoutes(app);

app.listen(3000, () => {
  console.log("Server started");
  console.log('Your routes running on http://localhost:3000');
});
