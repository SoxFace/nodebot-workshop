var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
  // temperature sensor TMP36 to **A0**
  var sensor = new five.Sensor('A0');
  // piezo to pin **9**
  var piezo = new five.Piezo(9);
  // LED to pin **13**
  var led = new five.Led(13);
  // button to pin **5**
  var button = new five.Button(5);
  var temperature = null;
  var wasButtonPressed = false;

  sensor.on('change', function () {
    temperature = ((this.value * 0.004882814) - 0.5) * 100;
    // temperature sensor detects a temperature above 50°C
    if (temperature > 50) {
      if (wasButtonPressed) {
        piezo.off();
        led.stop().off();
      } else {
        piezo.play({ // the piezo should sound
          song: [
            ['C4', 1/4]
          ]
        });
        led.strobe(0); // LED should flash on and off continuously
      } 
    } else { // temperature drops below 50°C the piezo and LED should switch off
      wasButtonPressed = false;
      piezo.off();
      led.stop().off();
    }
  });
  // button is pressed the piezo and LED should turn off and should not turn on again unless the temperature drops below 50°C
  button.on('press', function () {
    wasButtonPressed = true;
    piezo.off();
    led.stop().off();
  });
});