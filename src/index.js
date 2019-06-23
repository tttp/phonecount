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

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', function(){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});
server.listen(conf.port);
