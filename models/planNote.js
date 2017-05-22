var mongoose = require('mongoose');
var PlanNoteSchema = mongoose.Schema({
  user:String,
  tripName:String,
  wherePlay:String,
  planNote:String,
  startDate:String,
  endDate:String
});
module.exports = mongoose.model('PlanNote' , PlanNoteSchema);
