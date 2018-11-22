var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config= require('./src/config.js');
var indexRouter = require('./routes/index');
var campaignsRouter = require('./routes/campaigns');
var app = express();

app.set ('view engine', 'html');//    # use .html extension for templates 
app.set ('layout', 'layout'); //      # use layout.html as the default layout 
//app.set ('partials', foo: 'foo');  # define partials available to all pages 
app.enable('view cache')
app.engine('html', require('hogan-express'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/campaigns', campaignsRouter);

module.exports = app;
