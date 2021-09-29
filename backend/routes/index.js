var express = require('express');
var router = express.Router();
var path = require('path');
let server = require('http');
var svr ='';
let list='';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/crs', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/notis', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/reis', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/mtoverws', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public/index.html'));
});

router.get('/getdata*', function(req,res,next){
   console.log(list)
   return res.json(list)
});

router.post('/notion', function(req,res, next) {
  let port = 8369;
  let host = '127.0.0.1';
  svr ='';
  if(req.body.host != ''){
    host = req.body.host
  }

  if(req.body.port != ''){
    port = req.body.port
  }
  console.log(req.body.host,req.body.port);
  var response;
  console.log("Noti Server On " + host+ " : " + port);
  svr = server.createServer((req, res) => {
    let str = '';
    res.writeHead(200, { 'X-M2M-RSC': 2000 });
  
    req.on('data', (chunk) => {
      str = chunk.toString();
      response = str;
      list = JSON.parse(response);
      console.log(list);
    },
    res.end());
  });
  
  svr.listen(port, host);

});

router.post('/noticlose', function(req,res, next) {
  console.log("Noti Server close");
  svr.close();
 });
module.exports = router;
