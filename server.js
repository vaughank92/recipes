//setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configuration
mongoose.connect('mongodb://localhost');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

app.listen(8080);
console.log("App listening on port 8080");

//model
var Recipe = mongoose.model('Recipe', {
  title : String,
  ingredients : String,
  directions : String
});


//routes

//get all recipes
app.get('/api/recipes', function(req, res) {
  Recipe.find(function(err, recipes) {
    if(err)
      res.send(err)

    res.json(recipes);
  });
});

app.post('/api/recipes', function(req, res) {
  //create a recipes
  Recipe.create({
    title : req.body.title,
    ingredients : req.body.ingredients,
    directions : req.body.directions,
    done : false
  }, function(err, recipe) {
    if(err)
      res.send(err);

    Recipe.find(function(err, recipes) {
      if(err)
        res.send(err)
      res.json(recipes);
    });
  });
});

//delete recipe
app.delete('/api/recipes/:recipe_id', function(req, res) {
  Recipe.remove({
    _id : req.params.recipe_id
  }, function(err, recipe) {
    if(err)
      res.send(err);

    Recipe.find(function(err, recipes) {
      if(err)
        res.send(err)
      res.json(recipes);
    });
  });
});

//application
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});
