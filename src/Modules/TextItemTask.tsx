import type { ReactElement } from "react";
import {useContext, useEffect} from 'react'
import {callBacksContext} from "../ModuleRenderComponent";

type Props = {
    lazyProps : any,
};
export default function TextItem({lazyProps}:Props): ReactElement {
    const scriptsMap = useContext(callBacksContext)

    useEffect(() =>{
        // Bubble up the component information for logging purposes
        scriptsMap.get("AddComponentData").default(lazyProps.label)
      }, [])


    return(
            lazyProps.label
    );
}