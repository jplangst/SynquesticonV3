import type { ReactElement } from "react";
import {useState} from 'react';

type Props = {
  lazyProps : any
};

function MultiChoice({lazyProps}: Props): ReactElement {
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
              <li key={labelId}>
                <input id={labelId} onClick={handleToggle(choiceIndex)} type="checkbox" name={inputNameGroup}/>
                <label htmlFor={labelId}>{choiceLabel}</label> 
              </li>
            )
        })
    }</form>  
    );
}

export default MultiChoice;