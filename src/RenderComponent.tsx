import {useState, useEffect, useContext} from 'react';
import {CurrentExperimentContext} from './App'
import {useCommunicationContext} from './Communication/communicationModule';

function RenderComponent() {
    const experimentData = useContext(CurrentExperimentContext).currentExperiment
    const comms = useCommunicationContext()

    useEffect(() =>{
        if(experimentData){
            console.log(experimentData)
            comms.connect(experimentData.communicationMethod)
        }
    }, [experimentData])
    
    return (
    <h1 className='text-3xl font-bold underline'>Vite + React</h1>
    )
}

export default RenderComponent
