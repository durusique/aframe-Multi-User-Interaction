const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO = require('socket.io')(server); //create socket IO package and instintiate with server

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//set home page route
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

//set player1 page
app.get('/player1', function(req,res) {
    res.sendFile(__dirname + '/public/player1.html');
});

//set player2 page
app.get('/player2', function(req,res) {
    res.sendFile(__dirname + '/public/player2.html');
});

//set controller page route
app.get('/winner', function(req,res) {
    res.sendFile(__dirname + '/public/winner.html');
});

app.get('/loser', function(req,res) {
    res.sendFile(__dirname + '/public/loser.html');
});


//set color page route
app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

//set controller page route
app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});

//websocket events
socketIO.on('connection', function(socket){
    console.log(socket.id + 'has connect!');
    
    socket.on('disconnect', function(data){
        console.log(socket.id + 'has disconnect');
    }); 

    //target cube found by p1
    socket.on('targetCubeEvent', function(data){
        console.log('target cube event heard');
        socketIO.sockets.emit('cubeT_change');
    });
    //target cube found by p2
    socket.on('targetCubeEvent2', function(data){
        console.log('target cube event 2 heard');
        socketIO.sockets.emit('cubeT_change2');
    });
    //other cube found by p1
    socket.on('otherCubeEvent', function(data){
        console.log('other cube event heard');
        socketIO.sockets.emit('cube_change');
    });
    //other cube found by p2
    socket.on('otherCubeEvent2', function(data){
        console.log('other cube event 2 heard');
        socketIO.sockets.emit('cube_change2');
    });

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