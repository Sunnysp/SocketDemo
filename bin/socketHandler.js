/**
 * Created by USER on 7/16/2017.
 */

// var www=require('../bin/www');
// var server=www.server

exports.socketConnectionStuff=function(socketserver){
   var user=[];


//Whenever someone connects this gets executed
socketserver.on('connection', function(socket){
    console.log('A user connected');

    //send a message to browser
    setInterval(function () {
        console.log('send a message after connection');
        socket.send('Connection time:'+ new Date().toLocaleString());
    },1000);
    
    socket.on('userSelection',function (data) {
        if(user.indexOf(data)<0){
            user.push(data);
            var msg=data+'is succesfully registered for chat';
            socket.emit('userSet',{SuccessMessage:msg,User:data});
        }else{
            socket.emit('userError','Username already exist in our database');
        }
    });
    socket.on('textThrow',function (data) {
        //send message to every one
        socketserver.sockets.emit('newMsg',data);
    })
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

});
}
