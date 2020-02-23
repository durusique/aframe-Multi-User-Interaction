const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO = require('socket.io')(server); //create socket IO package and instintiate with server

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

// SETTING PAGE ROUTES

//set home page route
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

//set player1 competitive page route
app.get('/p1competitive', function(req,res) {
    res.sendFile(__dirname + '/public/p1competitive.html');
});

//set player2 competitive page route
app.get('/p2competitive', function(req,res) {
    res.sendFile(__dirname + '/public/p2competitive.html');
});

//set player1 cooperative page route
app.get('/p1coop', function(req,res) {
    res.sendFile(__dirname + '/public/p1coop.html');
});

//set player2 cooperative page route
app.get('/p2coop', function(req,res) {
    res.sendFile(__dirname + '/public/p2coop.html');
});

//set winner page route
app.get('/winner', function(req,res) {
    res.sendFile(__dirname + '/public/winner.html');
});

//set loser page route
app.get('/loser', function(req,res) {
    res.sendFile(__dirname + '/public/loser.html');
});

// WEBSOCKETS EVENTS

//check connection
socketIO.on('connection', function(socket){
    console.log(socket.id + 'has connect!');
    
    socket.on('disconnect', function(data){
        console.log(socket.id + 'has disconnect');
    }); 

    //event when target cube found by player 1
    socket.on('targetCubeEventP1', function(data){
        console.log('p1: target cube event heard');
        socketIO.sockets.emit('cubeT_foundByP1');
    });

    //target cube found by p2
    socket.on('targetCubeEventP2', function(data){
        console.log('p2: target cube event heard');
        socketIO.sockets.emit('cubeT_foundByP2');
    });

    //target cube found in coop interaction
    socket.on('targetCubeEventCoop', function(data){
        console.log('target cube event heard');
        socketIO.sockets.emit('cubeT_found');
    });
});

//start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);