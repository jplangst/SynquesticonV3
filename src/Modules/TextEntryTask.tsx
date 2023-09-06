import type { ReactElement } from "react";
import {ChangeEvent} from 'react';
import { v4 as uuidv4 } from 'uuid';

//import { useMQTTContext } from '../MQTT/MqttProvider';

type Props = {
    lazyProps : any,
};

export default function TextEntry({lazyProps}: Props): ReactElement {
    //const {addToLogObject} = useMQTTContext();

    const defaultTextValue = lazyProps.DefaultValue;
    let textFieldSize = lazyProps.EntryFieldOptions; // NB the text field size is not used now.
    textFieldSize = textFieldSize.split("size=")[1].split(',').map(Number)
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        //addToLogObject("Text entry", lazyProps.taskIndex, e.target.value)
        console.log(e.target.value)
    }

    return <span key={uuidv4()}><textarea placeholder={defaultTextValue} rows={textFieldSize[1]} cols={textFieldSize[0]} onChange={onChange}></textarea></span>
}