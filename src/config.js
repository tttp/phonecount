const dotenv=require('dotenv').config();

var conf= {
  port:process.env.port || 3000,
  url:process.env.url
}

console.log (conf)
module.exports =conf;

