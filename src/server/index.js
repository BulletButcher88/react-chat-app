const app = require('http').createServer();
var io = require('socket.io')(app)

const PORT = process.env.PORT || 3231

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

module.exports = io