var express = require('express')
  , logger = require('morgan')
  , app = express()
  , homepage = require('pug').compileFile(__dirname + '/source/templates/homepage.pug')
  , contact = require('pug').compileFile(__dirname + '/source/templates/contact.pug')
  , about = require('pug').compileFile(__dirname + '/source/templates/about.pug')
  , invitation = require('pug').compileFile(__dirname + '/source/templates/invitation.pug')
  , gallery = require('pug').compileFile(__dirname + '/source/templates/gallery.pug');

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res, next) {
  try {
    var html = homepage();
    res.send(html)
  } catch (e) {
    next(e)
  }
});

app.get('/contact', function (req, res, next) {
  try {
    var html = contact();
    res.send(html)
  } catch (e) {
    next(e)
  }
});

app.get('/about', function (req, res, next) {
  try {
    var html = about();
    res.send(html)
  } catch (e) {
    next(e)
  }
});

app.get('/invitation', function (req, res, next) {
  try {
    var html = invitation();
    res.send(html)
  } catch (e) {
    next(e)
  }
});

app.use('/gallery', require('node-gallery')({
    staticFiles : 'resources/photos',
    urlRoot : 'gallery', 
    title : 'Example Gallery',
    render : false,
    thumbnail: {
      width: 100,
      height: 100
    }
}), function(req, res, next){
  //This chained function is necessary because render is false. This is to pass
  //the returned JSON into a template. The template then figures out what to do
  //with the data.
  console.log(req.data);
  var html = gallery(req.data);
  return res.send(html);
});

/*app.use('/gallery', require('node-gallery')({
  staticFiles : 'resources/photos',
  urlRoot : 'gallery',
  title : 'Example Gallery'
}));*/

app.listen(process.env.PORT || 3001, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3001))
});
