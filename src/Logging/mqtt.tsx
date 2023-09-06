//const express = require("express");
var mqtt = require('mqtt');
const fs = require('fs');

let client = null;

const logFolder = "Logs";
if (!fs.existsSync(logFolder)){
    fs.mkdirSync(logFolder);
}

const logFilename = process.argv[2]
const logFile = logFolder+"/"+logFilename+".csv";
const eventTopicName = 'LogEvents' 

let headerWritten = false;

function connectToMQTTBroker(host, port){
    const clientId = "LogService";
    const username = "";
    const password = "";
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
        keepalive: 30,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 2,
        retain: false
        },
        rejectUnauthorized: false
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;

    client = mqtt.connect(url, options) 

    client.on("error", (err) => {
        console.log("Error: ", err);
        client.end();
    });

    client.on("reconnect", () => {
        console.log("Reconnecting...");
    });

    client.on("connect", () => {
        console.log("Client connected:" + clientId);
    });

    // Received Message
    client.on("message", (topic, message) => {
        if(topic !== eventTopicName){
            return
        }

        if(!headerWritten){
            headerWritten = true;
            const csvLine = `Timestamp,Client UUID,Task index,Event type,Payload\n`;
            writeEvent(csvLine);
        }

        parsedMessage = JSON.parse(message);
        console.log(parsedMessage)
        parsedMessage.forEach(logEvent => {
            const csvLine = `${logEvent.time},${logEvent.UUID},${logEvent.taskIndex},${logEvent.eventType},${logEvent.payload}\n`;
            writeEvent(csvLine);
        });
        
    });
}

function writeEvent(content){
    try {
        fs.appendFileSync(logFile, content) 
      } catch (err) {
        console.error(err);
      }
}

const host = process.argv[3]
const port = process.argv[4]

console.log(process.argv[2])
console.log(host)
console.log(port)

connectToMQTTBroker(host, port);

client.subscribe(eventTopicName,2)