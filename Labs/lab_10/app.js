const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Given code
app.use(
    session({
      name: "AuthCookie",
      secret: "some secret string!",
      resave: false,
      saveUninitialized: true,
    })
);

// Middleware to log to console
app.use(async (req, res, next) => {
  let time = new Date().toUTCString();
  let method = req.method;
  let url = req.originalUrl;
  let auth = req.session.user ? 'Authenticated User' : 'Non-Authenticated User';

  console.log(`[${time}]: ${method} ${url} (${auth})`);

  next();
});

// Authentication
app.use('/private', (req, res, next) => {
  if(!req.session.user){
    res.status(403).render('error', {title: 'Error 403', error: '403 You are not logged in!'});
    return;
  }
  next();
});


configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000\n');
});