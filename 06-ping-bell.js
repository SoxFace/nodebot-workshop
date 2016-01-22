var five = require('johnny-five');
var board = new five.Board();
var dgram = require('dgram');

board.on('ready', function () {
  // Attach a piezo to pin 8
  var piezo = new five.Piezo(8);
  // `dgram` node module to create a **udp4** socket
  var server = dgram.createSocket('udp4');
  // message is received, piezo plays a tune
  server.on('message', function () {
    piezo.play({
      song: [
        ['C4', 1/4]
      ]
    });
  });
  // Bind your server to port **1337** and listen for messages
  server.bind(1337, 'localhost');
});