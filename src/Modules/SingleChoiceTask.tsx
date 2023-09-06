import type { ReactElement } from "react";
import { v4 as uuidv4 } from 'uuid';

//import { useMQTTContext } from '../MQTT/MqttProvider';

//import {useContext} from 'react';
//import { Context } from '../RenderModeContext';


type Props = {
    lazyProps : any,
};

export default function SingleChoice({lazyProps}: Props): ReactElement {
    //const {addToLogObject} = useMQTTContext();
    //const RenderModeContext = useContext(Context);

    const handleChange = (e:any) => {
        //addToLogObject("Single choice",lazyProps.taskIndex,label); 
        console.log(e.target.value)
    };
    
    const singleChoiceLabels = lazyProps.choices.split(',');
    const inputName = singleChoiceLabels[0];
    return(
        <form>
            {
                singleChoiceLabels.map((choiceLabel:string, choiceIndex:number) => {
                    const labelId = choiceLabel+{choiceIndex}
                    return(
                        <li key={uuidv4()}>      
                            <input onClick={handleChange} type='radio' name={inputName} value={choiceLabel}/>
                            <label htmlFor={labelId}>{choiceLabel}</label> 
                        </li>
                    )
                }) 
            }
        </form>    
    );
}