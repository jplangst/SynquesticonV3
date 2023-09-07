import { v4 as uuidv4 } from 'uuid';
import {createContext, useContext} from 'react';
import {CurrentExperimentContext} from '../App';

const eventLogTopic = "e"
const commandsTopic = "c"
let communicationDetails = {
    type: "local",
    clientUUID: uuidv4(),
    host: 'localhost',
    port: 8083
}

export type CommunicationContextType = {
    communicationDetails:any;
    connect:(communicationDetails:any) => any;
    publish:(topic:string, payload:any) => void;
    subscribe:(topic:string) => void;
    disconnect:() => void;
    eventLogTopic:string;
    commandsTopic:string;
}

function connect(communicationDetails:any){  
    if(!communicationDetails)
        return
    //Dynamically import the selected communication library
    const communicationModulePath = './' + communicationDetails.type + '/Interface'
    import(communicationModulePath /* @vite-ignore */).then((comModule) => {
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
    if(!communicationDetails)
        return

    //Dynamically import the selected communication library
    const communicationModulePath = './' + communicationDetails.type + '/Interface'
    import(communicationModulePath /* @vite-ignore */).then((comModule) => {
        comModule.default.disconnect()
    }).catch(e => {
        console.log(e);
    });
}


interface Type {
    children: any
}

export const CommunicationContext = createContext<CommunicationContextType>({communicationDetails,connect, publish, subscribe, disconnect, eventLogTopic, commandsTopic});
export const useCommunicationContext = () => useContext(CommunicationContext) as CommunicationContextType;

const CommunicationProvider: React.FC<Type> = ({children}) => {   
    // Get the details on the communication library from the experiment provider
    const experimentData = useContext(CurrentExperimentContext)
    if(experimentData.currentExperiment)
        communicationDetails = experimentData.currentExperiment.communicationMethod
    return <CommunicationContext.Provider value={{communicationDetails,connect, publish, subscribe, disconnect, eventLogTopic, commandsTopic}}>{children}</CommunicationContext.Provider>;
}

export default CommunicationProvider