var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { 
        title: 'RabbitLALALA!',
        error: req.flash('error').toString(),
        success: req.flash('success').toString()
    });
});

router.get('/login', function(req, res){
    res.render('login', { 
        title: "用户登陆", 
        error: req.flash('error').toString(),
        success: req.flash('success').toString()
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
        req.flash('error', '用户名或密码不正确');
        res.redirect('/login');
    }
});

router.get('/logout', function(req, res){
    req.session.user = null;
    req.flash('success', 'logout success!');
    res.redirect('/');
});

router.get('/home', authentication);
router.get('/home', function(req, res){
    res.render('home', { 
        title: 'Home', 
        user: req.session.user 
    });
});

module.exports = router;

function authentication(req,res, next){
    if(!req.session.user){
        req.flash('error', '请先登陆');
        return res.redirect('/login');
    }
    next();
}

function notAuthentication(req, res, next){
    if(req.session.user){
        req.flash('error', '已登陆');
        return res.redirect('/');
    }
}
