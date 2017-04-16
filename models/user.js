var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
  userName:String,
  password:String,
  plans:[
    {
      planName:String,
      date:Number,
      places:[
        {
          name:String,
          location:String,
          rating:Number,
          place_id:String,
          day:Number
        }
      ]
    }
  ],
});
module.exports = mongoose.model('User' , UserSchema);
