const express= require('express');
const route = express.Router();
//.. subir nivel
const passport = require('passport');
const {isLoggedIn}  = require('../lib/auth');
const {isNotLoggedIn}  = require('../lib/auth');
route.get('/signup',isNotLoggedIn,(req,res)=>{
    res.render('auth/signup');
});

route.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

route.get('/signin',(req,res) =>{
    res.render('auth/signin');
});
//route.post('/signin',passport.authenticate('local.signin',{
  //  successRedirect: '/profile',
    //failureRedirect: '/signin',
    //failureFlash: true
//}));

route.post('/signin',(req,res,next) =>{
   passport.authenticate('local.signin',{
   successRedirect: '/profile',
   failureRedirect: '/signin',
   failureFlash: true
   })(req,res,next);
});

route.get('/profile', isLoggedIn,(req,res)=>{
    res.render('profile');
});

route.get('/logout', (req,res) =>{
    req.logout();
    res.redirect('/signin');
});
module.exports = route;