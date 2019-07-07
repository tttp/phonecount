var counters={};


function get(slug,url){ //todo: use the url as key?
  return counters[slug];
}

function getDummy(url){ //todo: use the url as key?
  var campaign={
    name:"dummy Campaign",
    slug:"dummy",
    action_count:0,
  }
  addCampaign(campaign);
  return campaign;
}

function addCampaign(campaign){
  counters[campaign.slug]=campaign;
  campaign.counter=campaign.parent_group? campaign.parent_group.rsigns: campaign.action_count;
  return campaign.counter;
}

function socket(server){
  var io = require('socket.io')(server);

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

  io.on('connection', function (socket) {
    console.log('a user connected');  
    socket.on('disconnect', function () {
      console.log('a user disconnected');  
    });

    socket.on('track', function (data) {
      console.log(data);
      socket.join(data.campaign, () => {console.log("joined "+data.campaign)});
      if (counters[data.campaign]){
        return;
      }

      counters[data.campaign]=data;
      track(data.campaign);
    });
  });


  return io;
}

module.exports.socket=socket;
module.exports.get=get;
module.exports.getDummy=getDummy;
module.exports.addCampaign=addCampaign;
