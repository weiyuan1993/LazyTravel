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
app.get('/LoginPage', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/UserPage', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));

});
app.get('/UserPage/NewTrip', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));

});


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
