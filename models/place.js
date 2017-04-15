var mongoose = require('mongoose');
var PlaceSchema = mongoose.Schema({
  name:String,
  location:String,
  rating:Number,
  place_id:String
});
module.exports = mongoose.model('Place' , PlaceSchema);
