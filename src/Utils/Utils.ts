export function broadcastLogObject(publish:any, eventLogTopic:string, logObject:any){
    publish(eventLogTopic, logObject)
}

// Load the provided experiment json file from the server. If none is provided loads the default experiment. 
export async function fetchExperiment(callback:any,filepath:string|null){
    let response;
    if(filepath) 
        response = await fetch("Experiments/"+filepath+".json");
    else
        response = await fetch("Experiments/defaultExperiment.json");

    const data = await response.text();
    callback(JSON.parse(data));
}
