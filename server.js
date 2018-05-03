var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8008;
const mqtt = require ('mqtt');

var client = mqtt.connect('mqtt://m12.cloudmqtt.com',{port:14007,username:"vfmscjlo",password:"jypR3A77pNBo"});

client.on('connect', function () {
    client.subscribe('temperatura');
    client.subscribe('estado1');
    client.subscribe('estado2');
    console.log('client has subscribed successfully');
});

client.on('message', function (topic, message){
    if(topic == 'temperatura'){
        console.log(message.toString());
        io.emit('temperatura', message.toString());
    }
    if(topic == 'estado1'){
        console.log(message.toString());
        io.emit('estado1', message.toString());
    }
    if(topic == 'estado2'){
        console.log(message.toString());
        io.emit('estado2', message.toString());
    }
});



app.get('/css/materialize.css',function(req,res){
    res.sendFile(__dirname + '/css/materialize.css');
});

app.get('/css/style.css',function(req,res){
    res.sendFile(__dirname + '/css/style.css');
});

app.get('/js/materialize.js',function(req,res){
    res.sendFile(__dirname + '/js/materialize.js');
});

app.get('/js/init.js',function(req,res){
    res.sendFile(__dirname + '/js/init.js');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/view.html');
});

io.on('connection', function(socket){
    socket.on('luz', function(msg){
        client.publish('/salida1','ON');
    });
    socket.on('bocina', function(msg){
        client.publish('/salida2','ON');
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});