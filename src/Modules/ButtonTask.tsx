import type { ReactElement} from "react";

import {useContext} from "react";
import {callBacksContext} from "../RenderComponent";

type Props = {
    lazyProps : any,
};

export default function ButtonTask({lazyProps}: Props): ReactElement {
    const scriptsMap = useContext(callBacksContext)

    const buttonOnClick = () => {
        if(lazyProps.onclick){
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