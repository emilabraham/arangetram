var express = require('express')
  , logger = require('morgan')
  , app = express()
  , homepage = require('pug').compileFile(__dirname + '/source/templates/homepage.pug')
  , contact = require('pug').compileFile(__dirname + '/source/templates/contact.pug')
  , about = require('pug').compileFile(__dirname + '/source/templates/about.pug')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = homepage()
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/contact', function (req, res, next) {
  try {
    var html = contact()
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/about', function (req, res, next) {
  try {
    var html = about()
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
