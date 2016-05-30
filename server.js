var express = require('express');
var app = express();
var moment = require('moment');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname +'/public')));
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.get('/:query', function(req,res){
  var unixTime = null;
  var naturalTime = null;
  var datePattern = ["MMMM/DD/YYYY", "DD/MMMM/YYYY", "YYYY/MMMM/DD", "MM/DD/YYYY",
  "DD/MM/YYYY", "YYYY/MM/DD"];
  if(!isNaN(req.params.query)){
    unixTime = req.params.query;
    naturalTime = moment.unix(unixTime).format("MMMM D, YYYY");
  }else if(moment(req.params.query, datePattern).isValid()){
    naturalTime = moment(req.params.query, datePattern).format('MMMM D, YYYY');
    unixTime = moment(naturalTime, datePattern).unix();
  }
  res.send({unix: unixTime, natural: naturalTime});
});
app.listen(port,function(){
  console.log('listen:' + port);
});