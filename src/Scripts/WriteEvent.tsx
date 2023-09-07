import { createLogEvent } from "../Logging/loggingModule";

// Write a log event to the browsers local storage
export default function writeEvent(eventData:any){
    const logEvent = createLogEvent(eventData.taskIndex, eventData.eventType, eventData.payload)

    // Get the stored log events
    let eventLog = localStorage.getItem("eventLog")
    
    //Parse the event into a csv line
    const csvLine = `${logEvent.time};${logEvent.UUID};${logEvent.taskIndex};${logEvent.eventType};${logEvent.payload}\n`;

    if(eventLog){
        //Parse the events if they exist
        eventLog = JSON.parse(eventLog)
        // Append the new event
        eventLog = eventLog + csvLine
    }   
    else{
        //Otherwise write the header and the first event
        const header = `Timestamp;Client UUID;Task index;Event type;Payload\n`;
        eventLog = header+csvLine
    }

    console.log(eventLog)

    // Update the local storage
    localStorage.setItem("eventLog", JSON.stringify(eventLog))
}