import type { ReactElement} from "react";

import {useContext, useEffect} from "react";
import {callBacksContext} from "../ModuleRenderComponent";

type Props = {
    lazyProps : any,
};

let startTimestamp = Date.now()
export default function ButtonTask({lazyProps}: Props): ReactElement {
    const scriptsMap = useContext(callBacksContext)

    useEffect(() =>{
        startTimestamp = Date.now()
        // Bubble up the component information for logging purposes
        scriptsMap.get("AddComponentData").default(lazyProps.label)
      }, [])

    const buttonOnClick = () => {
        if(lazyProps.onclick){
            //Write log event
            const relativeTimestamp = Date.now()-startTimestamp
            const event = {timestamp:relativeTimestamp ,taskIndex:lazyProps.taskIndex, eventType:"Button press", payload:lazyProps.label}
            scriptsMap.get("WriteEvent").default(event)

            const onclickFunction = scriptsMap.get(lazyProps.onclick.function)
            const functionValue = lazyProps.onclick.value

            if(functionValue){
                onclickFunction.default(functionValue);
            }
            else{
                onclickFunction.default();
            }
        }     
    } 

    return(
        <button type="button" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" 
            onClick={buttonOnClick}>{lazyProps.label}</button>
    );
}