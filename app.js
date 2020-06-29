var five = require("johnny-five");
var board = new five.Board();

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', (data) => {
    client.subscribe('garage/connected')
    client.subscribe('mani19/motor')
    client.subscribe("mani19/refresh")
})

let moisture;
let message;

board.on("ready", function () {
    var sensor = new five.Sensor("A2");

    var relayDigitalSwitchPin = 2; 
    var RELAY_OFF = 0;
    var RELAY_ON = 1;
    sensor.on("change", function () {
        moisture=this.value
    });
    client.on("message", (topic, message) => {
        if (topic === 'garage/connected') {
            console.log(message.toString());
        }
        if (topic==="mani19/motor"){
            console.log(message.toString());
            message=message.toString();
            if(message=="false"){
                board.digitalWrite(relayDigitalSwitchPin, RELAY_OFF);
            }
            else if(message=="true"){
                board.digitalWrite(relayDigitalSwitchPin, RELAY_ON);
            }
            // if(moisture>550){
            //     board.digitalWrite(relayDigitalSwitchPin, RELAY_ON);
            //     // if(message=="false"){
            //     //     board.digitalWrite(relayDigitalSwitchPin, RELAY_OFF);
            //     // }
            // }
            // else
            // {
            //     board.digitalWrite(relayDigitalSwitchPin, RELAY_OFF);
            //     // if (message=="true"){
            //     //     board.digitalWrite(relayDigitalSwitchPin, RELAY_ON);
            //     // }
            // }

        }

        if (topic==="mani19/refresh"){
            client.publish("mani19/data",JSON.stringify({moisture:moisture}));

            console.log("Refresh");
            console.log("Moisture reading:"+moisture);
        }
    })

    // Scale the sensor's data from 0-1023 to 0-10 and log changes
    sensor.on("change", function () {
        console.log(this.scaleTo(0, 10));
        console.log(this.value);
        moisture=this.value;
        // if (moisture>500){
        //     board.digitalWrite(relayDigitalSwitchPin, RELAY_ON);
           
        // }
        // else{
        //     board.digitalWrite(relayDigitalSwitchPin, RELAY_OFF);
        // }
            
    });
});