var express = require('express');
var router = express.Router();
var Movie = require('../models/movie.js');

/* get a add movie*/
router.get('/add', function(req, res){
    if(req.params.name){
        return res.render('movie',{
           title: req.params.name + '|电影|管理|moive.me',
           label: '编辑电影' + req.params.name,
           movie: req.params.name
        });
    }else{
        return res.render('movie',{
            title: '新增加|电影|管理|moive.me',
            label: '新增加电影',
            movie: false
        });
    }
});

/* post a add movie */
router.post('/add', function(req, res){
    console.log(req.body);
    console.log(req.body.content);
    //var json = req.body.content;
    var json = req.body;
    console.log(json.content);
    if(json._id){
        //update
    }else{
        Movie.save(json, function(err){
            if(err){
                req.flash('error',err);
            }else{
                req.flash('success', "Added Success");
            }
        });
    }
});

/* select a movie */
router.get('/:name', function(req, res){

});

/* json */
router.get('/json/:name', function(req, res){

});

module.exports = router;
