const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyparser=require("body-parser");
const path = require('path');
const bcrypt = require('bcryptjs');
let admin= require('firebase-admin');
let serviceAccount = require("./sarhaduni-6da25-firebase-adminsdk-488kj-57d8ec31f6.json");
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quickswapper-default-rtdb.firebaseio.com"
});
    //  bodyparser
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(path.join(__dirname+'/public')));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


// const adminroutes=require('./routes/adminroutes');
// const userroutes=require('./routes/userroutes');
// const userlogin=require('./routes/loginroutes');
// const  firestore  = require('firebase-admin');
// const notify=require('./routes/notification');

app.use('/adminRoutes',require('./routes/adminroutes'));
app.use('/userRoutes',require('./routes/userroutes'));
app.use('/stlogin',require('./routes/loginroutes'));
app.use('/notification',require('./routes/notification'));
app.use('/TeacherRoutes',require('./routes/teacherroutes'));

// app.get('/',(req,res)=>{
//   // res.redirect('/userRoutes/Teachersubject');
//   res.redirect('/adminRoutes/Admin');
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
