//import * as mqtt from 'mqtt'
//import { connect } from "mqtt"

import * as mqtt from 'mqtt/dist/mqtt.min';
//import mqtt from 'mqtt'

//console.log(MQTT)

let client = null;
const qos = 2; //{label:2, value:2}

export default{
  mqttConnect(host, mqttOption) {
    client = mqtt.connect(host, mqttOption);
    return client;
  },
  mqttDisconnect() {
    if(client){
      client.end();
    }
  },
  mqttPublish(topic, payload){
    if (client) {
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  },
  mqttSub(topic){
    if (client) {
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return
        }
      });
    }
  },
  mqttUnSub(topic){
    if (client) {
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error);
          return
        }
      });
    }
  }
}
