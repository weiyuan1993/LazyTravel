var mongoose = require('mongoose');
var PlaceSchema = mongoose.Schema({
  user:String,
  placeName:String,
  rating:String,
  place_id:String,
  address:String
});
module.exports = mongoose.model('Place' , PlaceSchema);
