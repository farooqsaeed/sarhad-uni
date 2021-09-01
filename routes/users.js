const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const Studentregister=require('../models/studentRegister');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

router.get('/stdregister', (req, res) => res.render('stdregister'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// student registration


router.post('/studregister', (req, res) => {
  const { studentname, email, password, decipline ,semester,section,rollnum } = req.body;
  let errorsArr = [];


  if (password.length < 6) {
    errorsArr.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errorsArr.length > 0) {
    res.render('stdregister', {
      errors,
      studentname,
      email,
      password,
      decipline,
      semester,
      section,
      rollnum
    });
  } else {
    Studentregister.findOne({ email: email }).then(user => {
      if (user) {
        errorsArr.push({ msg: 'Registeration ID already exists' });
        res.render('stdregister', {
          errors,
          studentname,
          email,
          password,
          decipline,
          semester,
          section,
          rollnum
        });
      } else {
        const newUser = new Studentregister({
          studentname,
          email,
          password,
          decipline,
          semester,
          section,
          rollnum
        });


        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Studennt registered successfully'
                );
                res.redirect('/dashboard');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// change password

router.post('/updatepassword', (req , res)=>{

  Studentregister.findOne({email:req.body.reg_id}, function(err, user) {
    if (err) throw err;
    else{
      if(!user){
        return res.send({
          "Success":false,
          "message":"user not found!",
  
        });
      }else{
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            var newpassword = hash;
            user.password = newpassword
            const updatedUser = user.save();
            return res.send({
              "Success":true,
              "message":"password updated successfully",
      
            });
      
            
            
          });
        });
      }
     
    }
 
  })
});

router.post('/saveToken',(req,res)=>{

  Studentregister.findOne({email:req.body.reg_id}, function(err, user) {
    if (err) throw err;
    else{
      if(!user){
        return res.send({
          "Success":false,
          "message":"user not found!",
  
        });
      }else{
        user.devicetoken = req.body.device_token
            const updatedUser = user.save();
            return res.send({
              "Success":true,
              "message":"Token Saved successfully",
              "users":updatedUser 
      
            });
      }
     
    }
 
  })

})



// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
