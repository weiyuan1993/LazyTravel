var path = require('path');
var express = require('express');
var app = express();
var axios = require('axios');
var fs = require('fs')
var PORT = process.env.PORT || 8080
var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/NewTrip', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));

});
app.post('/user', function(req, res) {
    console.log(req.body);
    fs.readFile('./user.json', 'utf-8', function(err, data) {
    	if (err) throw err

    	var arrayOfObjects = JSON.parse(data)
    	arrayOfObjects.users.push(req.body.plan.name)

    	console.log(arrayOfObjects)

    	fs.writeFile('./user.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
    		if (err) throw err
    		console.log('Done!')
    	})
    })
});
app.post('/deleteAllPlan', function(req, res) {
    fs.readFile('./user.json', 'utf-8', function(err, data) {
    	if (err) throw err

    	var arrayOfObjects = JSON.parse(data)
    	arrayOfObjects.users =[]

    	console.log(arrayOfObjects)

    	fs.writeFile('./user.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
    		if (err) throw err
    		console.log('Delete Done!')
    	})
    })
});

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
