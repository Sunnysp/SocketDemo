var express = require('express');
var router = express.Router();
var path = require('path');
var www=require('../bin/www');
var socketio=require('socket.io');
var socketserver=socketio(www.server);
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
/*Get Html Home Page*/
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile(path.join(baseDirectory,'public/View','index.html'));
});

socketserver.on('connection', function(socket){
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

});

module.exports = router;
