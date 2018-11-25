const dotenv=require('dotenv').config();
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var conf= {
  port:process.env.port || 3000,
  url:process.env.url
}
console.log(conf);
conf.counter=123456;

app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', function(){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});
server.listen(conf.port);
