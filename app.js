
/**
 * FANUC ROBOT HTTP SERVER CLIENT
 * @Auhthor Kapelajii2020
 */

// constants
const mqtt = require('mqtt');
const FANUC_SERVER = 'https://fanuc-robot-http-server.herokuapp.com/'
const MQTT_SERVER = 'wss://auoh20-mqtt-broker.herokuapp.com';

// program main-loop
const main_loop = () => {
  setTimeout(() => {
    // save program start time 
    const start_time_stamp = new Date();
    // get robot axis values from Fanuc-server
    const axios = require("axios");
    axios.get(FANUC_SERVER).then(res => {
        // regular expression to get correct data from dataset
        const regexp = /Joint   \d{1}:    ([-| ]\d{1,2}.\d{1,2})/g;
        let joints = [];
        let matches = res.data.matchAll(regexp);
        let count = 0;
        for (const match of matches) {
            count++;
            // get first six values from filtered dataset [axis 1-6 position]
            if (count > 6) break;
            const value = parseFloat(match[1]);
            joints.push(value);
            } 
        // data processing ready 
        const time_stamp_end = new Date();
        // calculate processing time in ms
        const delta = time_stamp_end - start_time_stamp; 
        console.log(time_stamp_end.toISOString()+" [ " +joints +" ] "+delta+" ms")
        
        // create MQTT-data 
        let data = {
          time : time_stamp_end,
          joints: joints
        }
        // publish data to MQTT-broker
        mqtt_client.publish('joints',JSON.stringify(data));      
});
    main_loop();
  }, 10);
};

// connect to MQTT broker
const mqtt_client = mqtt.connect(MQTT_SERVER);
mqtt_client.on('connect', () => {
  console.log('connected to mqtt broker');
  main_loop();
})

