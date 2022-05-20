const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const path = require('path');
const { engine } = require('express-handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine({ "defaultLayout": "main" }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public/'));

app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 60000}
  })
);

app.use('/private', (req, res, next) => {
  console.log(req.session.id);
  if (!req.session.user) {
   res.status(403).render('login/error')
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private');
  } else {
    //here I',m just manually setting the req.method to post since it's usually coming from a form
    req.method = 'POST';
    next();
  }
});

app.use(async (req, res, next) => {
    if(req.session.user){
      console.log(new Date().toUTCString() + ': ' + req.method + req.originalUrl  + ' Authenticated User');
    } else{
      console.log(new Date().toUTCString() + ': ' + req.method + req.originalUrl + ' Non-Authenticated User');
}
next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});