/**
 * Created by USER on 7/16/2017.
 */
var socket=io();
var user='';
$(document).ready(function () {
    document.getElementById('chat-div').style.display="none";
})
socket.on('message', function(data){
document.getElementById('live-time').innerText=data;
});
var setUserName=function () {
    var userName=document.getElementById('name').value;
    socket.emit('userSelection',userName);
};
socket.on('userError',function (data) {
    document.getElementById('error-container').innerHTML=data;
    document.getElementById('error-container').style.color="red";
});
socket.on('userSet',function (data) {
    document.getElementById('error-container').innerHTML=data.SuccessMessage;
    user=data.User;
    document.getElementById('chat-div').style.display="block";
    document.getElementById('user-div').style.display="none";

});
var sendMessage=function () {
    var msg=document.getElementById('message').value;
    if(msg){
        document.getElementById('error-container').innerHTML="Message is sent successfully";
        socket.emit('textThrow',{message:msg,User:user});
    }
};
socket.on('newMsg',function (data) {
    document.getElementById('error-container').innerHTML='Message is received by all users';
    document.getElementById('message-container').innerHTML +='<div> <b>'+data.User+'</b> :'+data.message+' </div>';
});
