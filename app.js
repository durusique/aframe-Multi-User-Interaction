const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO = require('socket.io')(server); //create socket IO package and instintiate with server

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//set home page route
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

//set color page route
app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

//set controller page route
app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});

//websockets event
socketIO.on('connection', function(socket){
    console.log(socket.id + 'has connect!');
    
    socket.on('disconnect', function(data){
        console.log(socket.id + 'has disconnect');
    }); 

    //custom events
    socket.on('redEvent', function(data){
        console.log('red event heard');
         //emit event
         socketIO.sockets.emit('color_change', {r:255, g:0, b:0});
    });

    socket.on('greenEvent', function(data){
        console.log('green event heard');
        //emit event
        socketIO.sockets.emit('color_change', {r:0, g:255, b:0});
    });

    socket.on('blueEvent', function(data){
        console.log('blue event heard');
         //emit event
         socketIO.sockets.emit('color_change', {r:0, g:0, b:255});
    });
});

//start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);