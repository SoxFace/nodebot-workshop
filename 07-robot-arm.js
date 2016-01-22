var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
  // Attach a potentiometer to pin A2
  var potentiometer = new five.Sensor('A2');
  // ttach a servo to pin 9
  var servo = new five.Servo(9);
  
  // servo rotate as the potentiometer is turned
  potentiometer.on('data', function () {
    var destination = five.Fn.map(
      this.value,
      0, 1023,
      0, 179
    );

  servo.to(destination);
  });
});