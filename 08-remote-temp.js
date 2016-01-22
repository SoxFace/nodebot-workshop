var five = require('johnny-five');
var dnode = require('dnode');
var board = new five.Board();

board.on('ready', function () {
  // Attach temperature sensor to **A0**
  var sensor = new five.Sensor('A0');
  var temperature = null;

  sensor.on('data', function () {
    // `getTemperature` calls temperature in celsius
    temperature = ((this.value * 0.004882814) - 0.5) * 100;
  });

  // dnode to create an rpc server
  var server = dnode({
    // query the last known temperature of sensor
    // rpc endpoint should expose a function called `getTemperature`
    getTemperature: function (cb) {
      cb(temperature);
    }
  });
  // dnode server to listen on port 1337
  server.listen(1337);
});