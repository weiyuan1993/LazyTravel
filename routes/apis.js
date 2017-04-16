var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Place = require('../models/place.js');
var User = require('../models/user.js');
/*Get /place 地點列表*/
router.get('/places', function(req, res) {
  Place.find(function(err,places){
    if(err)return next(err);
    res.json(places);
  });
});

/*post /place 地點*/

router.post('/places', function(req, res, next) {
  Place.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log("receive post!",req.body);
    res.json(req.body);
  });
});

router.post('/users/login', function(req, res, next) {
  User.find(function(err,users){
    //查詢是否有此使用者
    for(var i=0 ;i<users.length ;i++){
      if(users[i].userName == req.body.userName){
        //驗證密碼
        if(users[i].password == req.body.password){
          console.log("User",users[i].userName,"Login successfully!");
          return res.json(users[i]);

        }else{
          console.log("Wrong password!");
          return res.json({passwordWrong:true});
        }
      }else{
        console.log(req.body.userName,"Not register yet!");
        return res.json({notRegisterd:true});
      }
    }
  })
});
router.post("/users/register",function(req,res,next){
    User.find(function(err,users){
      if(users.length==0){
        User.create(req.body, function (err, post) {
          if (err) return next(err);
          console.log("User register successfully!",req.body);
          return res.json(req.body);
        });
      }else{
        for(var i =0; i<users.length; i++){
          if(users[i].userName == req.body.userName){
            console.log("This username is already registered!");
            return res.json({isAlreadyRegistered:true});
          }
        }
        User.create(req.body, function (err, post) {
          if (err) return next(err);
          console.log("User register successfully!",req.body);
          return res.json(req.body);
        });
      }

    })

});

module.exports = router;
