const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const loacalStrategy = require('passport-local');
const bcrypt = require('bcrypt')
const app = express();
require('dotenv').config();
const port = process.env.PORT;

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PSWD}@cluster0.l3zpp.mongodb.net/login_auth?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//models
const UserSchema = require('./models/User.js');
const User = mongoose.model('User', UserSchema);



//middleware
app.engine('hbs', hbs({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: "thisisasecretkey",
  resava: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

//passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err,user) => {
    done(err,user)
  });
});



app.listen(port, () => {
  console.log(`server is running at  port ${port}`);
});
