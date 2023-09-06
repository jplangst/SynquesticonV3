import { saveAs } from 'file-saver';

export function writeEvent(logEvent:any){
    // Get the stored log events
    let eventLog = localStorage.getItem("eventLog")
    
    //Parse the event into a csv line
    const csvLine = `${logEvent.time},${logEvent.UUID},${logEvent.taskIndex},${logEvent.eventType},${logEvent.payload}\n`;

    if(eventLog){
        //Parse the events if they exist
        eventLog = JSON.parse(eventLog)
        // Append the new event
        eventLog = eventLog + csvLine
    }   
    else{
        //Otherwise write the header and the first event
        const header = `Timestamp,Client UUID,Task index,Event type,Payload\n`;
        eventLog = header+csvLine
    }

    // Update the local storage
    localStorage.setItem("eventLog", JSON.stringify(eventLog))
}

export function downloadLogEvents(filename:string){
    let test = localStorage.getItem("eventLog")
    if(test){
        const eventString = JSON.parse(test)
        //Download log as a file
        var file = new File([eventString], filename, {type: "text/csv;charset=utf-8"});
        saveAs(file);
    }
}

export function clearEventStorage(){
    localStorage.removeItem('eventLog');
}