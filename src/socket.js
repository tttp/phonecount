function socket(server) {

let interval;
const io = require('socket.io')(server);

function track(key){

  setTimeout(function(){
    var active = io.sockets.adapter.rooms[key];
    if (!io.sockets.adapter.rooms[key]) //inactive room
      return; //we stop tracking
    console.log(key+":"+counters[key].counter);
    counters[key].counter += 1;
    io.to(key).emit("counter",counters[key].counter);
    track(key);
  }, 2000);

}


  function dispatch(key,socket) {
    socket.on(key,(data) => {
      console.log("new "+key+":"+data);
      io.sockets.emit(key,data);
    });
  }

  function ping (socket) {
    socket.volatile.emit ("PING");
    socket.on("PONG",(data) => {
      console.log("PONG");console.log(data);
    });
  };

  function heartbeat(socket) {
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => ping(socket), 10000);
    };

  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('a user disconnected');
    });

    //heartbeat(socket);
    dispatch("value",socket);
    socket.on('track', function (data) {
      console.log(data);
      socket.join(data.campaign, () => {console.log("joined "+data.campaign)});
      if (counters[data.campaign]){
        return;
      }

      counters[data.campaign]=data;
      track(data.campaign);
    });
  })
};
module.exports.socket = socket;

