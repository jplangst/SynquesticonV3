export type MQTTContextType = {
    connect:(clientUUID:string, host:string|undefined, port:string|undefined) => any;
    publish:(topic:string, payload:any) => void;
    subscribe:(topic:string) => void;
    disconnect:() => void;
    eventLogTopic:string;
    commandsTopic:string;
    clientUUID:string;
    addToLogObject:(eventType:string, taskIndex?:any, payload?:any) => void;
    resetLogObject:() => void;
    publishLogObject:(eventType:string) => void;
}