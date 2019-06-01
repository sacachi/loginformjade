var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var User = require('../models/users');

/* GET users listing. */

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});
router.get('/register', function(req, res, next) {
  res.render('register',{title: 'Register', user: ''});
});
router.post('/register',upload.single('profileImage'), function(req, res, next) {

    //Form validator
    req.checkBody('name','Name is not empty').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password','Password is not empty').notEmpty();
    req.checkBody('confirmPassword','Password is not the same').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {errors: errors, user: req.body})
    }
    else {
        if (req.file){
            var profileImage = req.file.filename;
        }
        else  {
            var profileImage = 'noimage.jpg';
        }
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileImage : profileImage,
        });
        User.createUser(newUser,function (err,user) {
            if (err) throw err;
            req.flash('info', 'You are registered, you can login ');
            res.redirect('/');
        })
    }

});

router.get('/logout', function(req, res, next) {
  res.render('logout',{title: 'Logout'});
});
module.exports = router;
