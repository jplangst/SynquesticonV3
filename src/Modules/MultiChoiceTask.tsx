import type { ReactElement } from "react";
import {useState} from 'react';

//import { useMQTTContext } from '../MQTT/MqttProvider';

//import {useContext} from 'react';
//import { Context } from '../RenderModeContext';

type Props = {
  lazyProps : any
};

//let logChecked:any = []
function MultiChoice({lazyProps}: Props): ReactElement {
    //const {addToLogObject} = useMQTTContext();
    //const RenderModeContext = useContext(Context);
    //checked will contain the indicies of the checked elements
    const [checked, setChecked] = useState<number[]>([]);

    const handleToggle = (value:number) => () => {   
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      //addToLogObject("Multiple choice",lazyProps.taskIndex,"["+newChecked.toString().replaceAll(",",":")+"]");
      setChecked(newChecked);
    };

    const multiChoiceLabels = lazyProps.choices.split(',');
    const inputNameGroup = multiChoiceLabels[0];
    return(
        <form>{
        multiChoiceLabels.map((choiceLabel:string, choiceIndex:number) => {
            const labelId = choiceLabel+{choiceIndex};            
            return(
              <span key={labelId}>
                <input id={labelId} onClick={handleToggle(choiceIndex)} type="checkbox" name={inputNameGroup}/>
                <label htmlFor={labelId}>{choiceLabel}</label> 
              </span>
            )
        })
    }</form>  
    );
}

export default MultiChoice;