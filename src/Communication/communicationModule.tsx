import {createContext, useContext, useEffect, useState} from 'react';
import {CurrentExperimentContext} from '../App';

// I want the communication Module to be the entry way into communication in the app
// I want the details of the underlying communication library to be hidden 

// Functions to broadcast and receive messages should be provided
// This component should in turn ensure that the underlying comms method receives the data and broadcasts

const eventLogTopic = "e"
const commandsTopic = "c"
let communicationDetails = {
    type: "local",
    clientUUID: Math.random().toString(16).substr(2, 8),
    //const clientUUID = uuidv4();//crypto.randomUUID();
    host: 'localhost',
    port: 8083
}

export type CommunicationContextType = {
    communicationDetails:any;
    commType:string;
    //connect:(clientUUID:string, host:string|undefined, port:string|undefined) => any;
    connect:(communicationDetails:any) => any;
    publish:(topic:string, payload:any) => void;
    subscribe:(topic:string) => void;
    disconnect:() => void;
    eventLogTopic:string;
    commandsTopic:string;
    clientUUID:string;
}

function connect(communicationDetails:any){  
    console.log(communicationDetails)
    const communicationModulePath = './' + communicationDetails.type + '/Interface'
    //Dynamically import the selected communication library
    import(communicationModulePath).then((comModule) => {
        comModule.default.connect(communicationDetails.clientUUID, communicationDetails.host, communicationDetails.port)
    }).catch(e => {
        console.log(e);
    });
}

function publish(){

}

function subscribe(){

}

function disconnect(){

}


interface Type {
    children: any
}

export const CommunicationContext = createContext<CommunicationContextType>({communicationDetails,connect, publish, subscribe, disconnect, eventLogTopic, commandsTopic});
export const useCommunicationContext = () => useContext(CommunicationContext) as CommunicationContextType;

const CommunicationProvider: React.FC<Type> = ({children}) => {   
    //const [communicationDetails, setCommunicationDetails] = useState(null)
    // Get the details on the communication library from the experiment provider
    const experimentData = useContext(CurrentExperimentContext)
    if(experimentData.currentExperiment)
        communicationDetails = experimentData.currentExperiment.communicationMethod
        //setCommunicationDetails(experimentData.currentExperiment.communicationMethod)
    return <CommunicationContext.Provider value={{communicationDetails,connect, publish, subscribe, disconnect, eventLogTopic, commandsTopic}}>{children}</CommunicationContext.Provider>;
}



export default CommunicationProvider