var path = require('path');
var express = require('express');
var app = express();
var axios = require('axios');
var fs = require('fs');
var bodyParser = require('body-parser');
var apis = require('./routes/apis');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 8080


// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use('/api', apis);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/NewTrip', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));

});
// app.post('/user', function(req, res) {
//
//     fs.readFile('./user.json', 'utf-8', function(err, data) {
//     	if (err) throw err
//
//     	var arrayOfObjects = JSON.parse(data)
//       if(req.body.plan){
//         arrayOfObjects.plans.push(req.body.plan)
//       }
//       if(req.body.tripName&&req.body.wherePlay){
//         arrayOfObjects.tripName = req.body.tripName;
//         arrayOfObjects.wherePlay = req.body.wherePlay;
//       }
//
//     	console.log(arrayOfObjects)
//
//     	fs.writeFile('./user.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
//     		if (err) throw err
//     		console.log('Done!')
//     	})
//     })
// });
//
// app.post('/deleteAllPlan', function(req, res) {
//     fs.readFile('./user.json', 'utf-8', function(err, data) {
//     	if (err) throw err
//
//     	var arrayOfObjects = JSON.parse(data)
//     	arrayOfObjects.plans =[]
//
//     	console.log(arrayOfObjects)
//
//     	fs.writeFile('./user.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
//     		if (err) throw err
//     		console.log('Delete Done!')
//     	})
//     })
// });

app.all('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-COntrol-Allow-Headers','X-Requested-With');
    next();
});


//連接資料庫
mongoose.connect('mongodb://admin:robert17@ds035806.mlab.com:35806/lazytraveldb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection on lazytraveldb successful');
});


app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
