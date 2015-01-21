var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'RabbitLALALA!'});
});

router.get('/login', function(req, res){
    res.render('login', { 
        title: "用户登陆", 
        msg: req.flash('msg').toString()
    });
});

router.post('/login', function(req, res){
    var user = {
        username: 'admin',
        password: 'admin'
    }

    if(req.body.username === user.username && req.body.password === user.password){
        req.session.user = user
        res.redirect('/home');
    }else{
        req.flash('msg', '用户名或密码不正确');
        res.redirect('/login');
    }
});

router.get('/logout', function(req, res){
    req.session.user = null;
    res.redirect('/');
});

router.get('/home', function(req, res){
    var user = {
        username: 'admin',
        password: 'admin'
    }
    res.render('home', { title: 'Home', user: user});
});

module.exports = router;
