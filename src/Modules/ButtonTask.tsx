import type { ReactElement} from "react";
import { writeEvent } from "../Logging/local";

import { useCommunicationContext } from '../Communication/communicationModule'

type Props = {
    lazyProps : any,
};

export default function ButtonTask({lazyProps}: Props): ReactElement {
    const comms = useCommunicationContext()

    function onClick(){
        //console.log("Clicked")      
        //console.log(comms)


       /*  const logEvent = {
            time: Date.now(),
            UUID: clientUUID,
            taskIndex: lazyProps.taskIndex,
            eventType: eventType,
            payload: payload
        } */
        
        writeEvent()
        //writeEvent(["Button press",lazyProps.taskIndex,lazyProps.action])
        //addToLogObject("Button press",lazyProps.taskIndex,lazyProps.action);
        //publish(commandsTopic,{action:lazyProps.action, UUID:clientUUID})      
    }

    //const RenderModeContext = useContext(Context);
    const buttonOnClick = () => onClick();
    return(
        <button type="button" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={buttonOnClick}>{lazyProps.label}</button>
    );
}