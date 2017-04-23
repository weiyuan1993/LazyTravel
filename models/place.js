var mongoose = require('mongoose');
var PlaceSchema = mongoose.Schema({
  user:String,
  name:String,
  location:String,
  rating:Number,
  place_id:String,
  day:Number
});
module.exports = mongoose.model('Place' , PlaceSchema);
