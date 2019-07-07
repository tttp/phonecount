var conf = require('../src/config.js');
var express = require('express');
var router = express.Router();
const counters = require('../src/counter.js');//not a controller, a lib
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  var url = req.query.url || conf.url;
  console.log (url);
  fetch("https://"+ url +"/featured.json")
  .then(res => res.json())
  .then(campaigns => {
    res.render('campaigns', { title: 'list', url: url,campaigns: campaigns })
  });

//  res.send('list all campaigns');
});

router.get('/:campaign', (req, res, next) => {
  var url = "https://"+ (req.query.url || conf.url);
  url += "/campaigns/"+ req.params.campaign + ".json";
  var campaign=counters.get(req.params.campaign,url);
  if (campaign){
    res.render('campaign', { title: campaign.name, url: req.query.url || conf.url, counter:campaign.counter, campaign: campaign });
    return;
  }
  fetch(url)
  .then(res => console.log(res.ok))
  .then(res => res.json())
  .then(campaign => {
    console.log(campaign);
    res.render('campaign', { title: campaign.name, url: req.query.url || conf.url, counter:count, campaign: campaign })
  })
  .catch(err => {
    campaign=counters.getDummy();
    console.log(campaign);
    res.render('campaign', { title: campaign.name, url: req.query.url || conf.url, counter:campaign.counter, campaign: campaign })

    //res.send(500);//todo: better error display
    console.error(err)})
});

module.exports = router;
