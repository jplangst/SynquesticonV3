let UUID = "DEFAULT";

export function setUUID(UUID_:string){
    UUID = UUID_
}

export function createLogEvent(taskIndex:number, eventType:string, payload:string){
    const logEvent = {
        time: Date.now(),
        UUID: UUID,
        taskIndex: taskIndex,
        eventType: eventType,
        payload: payload
    }
    return logEvent
}