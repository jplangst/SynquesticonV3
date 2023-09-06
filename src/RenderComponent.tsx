import {useState, useEffect, useContext, createContext} from 'react';
import {CurrentExperimentContext} from './App'
import {useCommunicationContext} from './Communication/communicationModule';
import getTaskTable from './Modules/TaskTable';

export const callBacksContext = createContext<any>(null);

function RenderComponent() {
    const experimentData = useContext(CurrentExperimentContext).currentExperiment
    const comms = useCommunicationContext()

    const [displayObject, setDisplayObject] = useState(null)
    const [taskIndex, setTaskIndex] = useState(0)

    useEffect(() =>{
        if(experimentData){
            comms.connect(experimentData.communicationMethod)
            const tasks = getTaskTable(experimentData.tasks)
            setDisplayObject(tasks[taskIndex])
        }

        return () => {
            if(experimentData){
                comms.disconnect()
            }
        }
    }, [experimentData])
    
    return (
        <div className="flex h-screen w-screen bg-sky-100 items-center justify-center">{displayObject}</div>
    )
}

export default RenderComponent
