var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Place = require('../models/place.js');
var User = require('../models/user.js');

var PlanNote = require('../models/planNote.js');
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
      }
    }
    console.log(req.body.userName,"Not register yet!");
    return res.json({notRegisterd:true});
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

router.post('/users/planNote', function(req, res, next) {
  PlanNote.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log("receive post!",req.body);
    res.json(req.body);
  });
});
router.get('/users/planNote/user/:userName', function(req, res) {
  PlanNote.find({user:req.params.userName},function(err,planNote){
    if(err)return next(err);
    res.json(planNote);
  });
});

router.get('/users/planNote/user/:userName/trip/:tripId', function(req, res) {
  PlanNote.findOne({user:req.params.userName,_id:req.params.tripId},function(err,planNote){
    if(err)return next(err);
    res.json(planNote);
  });
});
router.put('/users/planNote/user/:userName/trip/:tripId', function(req, res) {
  PlanNote.findOneAndUpdate({user:req.params.userName,_id:req.params.tripId},req.body,function(err,planNote){
    if(err)return next(err);
    res.json(planNote);
  });
});
router.delete('/users/planNote/user/:userName/trip/:tripId', function(req, res) {
  PlanNote.findOneAndRemove({user:req.params.userName,_id:req.params.tripId},function(err){
    if(err)return next(err);
    console.log("行程: "+req.params.tripId+"刪除成功");

  });
});

module.exports = router;
