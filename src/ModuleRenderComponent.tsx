import {useState, useEffect, useContext, createContext, Suspense} from 'react';
import {CurrentExperimentContext} from './App'
import {useCommunicationContext} from './Communication/communicationModule';
import { callScript } from './Utils/Utils';
import getExperimentData from './GetExperimentData';
import writeEvent from './Scripts/WriteEvent';

export const callBacksContext = createContext<any>(null);
let componentEventData = ""
let taskStartTimestamp = Date.now()
function ModuleRenderComponent() {
    const experimentData = useContext(CurrentExperimentContext).currentExperiment
    const comms = useCommunicationContext()

    const [experimentObject, setExperimentObject] = useState<{scriptsMap:any,codeModulesMap:any,taskRenderObjects:any}>({scriptsMap:null,codeModulesMap:null,taskRenderObjects:null})
    const [taskIndex, setTaskIndex] = useState(0)

    function addComponentEventData(componentData:string){      
        componentEventData += " " + componentData
    }

    function updateTaskIndex(newIndex:number|null){
        if(newIndex){
            setTaskIndex(newIndex)
        }  
        else{
            setTaskIndex(taskIndex+1)
        }
    }

    // Inject functions that we need to call deeper in the children tree
    function injectScripts(scriptsMap:Map<string,any>){
        const setTaskIndexFunc = {default: updateTaskIndex}
        scriptsMap.set("SetTaskIndex", setTaskIndexFunc)

        const addComponentDataFunc = {default: addComponentEventData}
        scriptsMap.set("AddComponentData", addComponentDataFunc)

        const writeEventDataFunc = {default: writeEvent}
        scriptsMap.set("WriteEvent", writeEventDataFunc)
    }

    // TODO (later) move the comm connect into a code module instead. Then disconnect can be a module too. 
    // Loads the experiment data from the json file. Converts the data into modules.
    // Connects to comms tech at mount and disconnects at unmount
    useEffect(() =>{
        async function fetchData(){
            const [scriptsMap, codeModulesMap, tasks] = await getExperimentData(experimentData.taskStack)
            injectScripts(scriptsMap)
            setExperimentObject({scriptsMap:scriptsMap,codeModulesMap:codeModulesMap,taskRenderObjects:tasks})
        }      
        if(experimentData){
            fetchData()
            if(experimentData.communicationMethod){
                comms.connect(experimentData.communicationMethod)
            }
        }

        return () => {           
            if(experimentData && experimentData.communicationMethod){
                comms.disconnect()
            }
        }
    }, [experimentData])
    
    // Calls onLoad and unLoad scripts at correct task indexes according to the code modules in the json experiment file
    useEffect(() => {
        if(experimentObject.codeModulesMap){
            callScript(experimentObject, taskIndex, "onLoad")
        }
        return () => {
            if(experimentObject.codeModulesMap){
                callScript(experimentObject, taskIndex, "onUnload")
            }
        }
    },[experimentObject,taskIndex])

    // Calls onLoad and unLoad scripts at correct task indexes according to the code modules in the json experiment file
    useEffect(() => {
        // Write task start event which includes the text from all the rendered components
        if(experimentObject.scriptsMap){
            taskStartTimestamp = Date.now()
            // Write task start event
            const event = {timestamp:taskStartTimestamp ,taskIndex:taskIndex, eventType:"Start task", payload:componentEventData}
            experimentObject.scriptsMap.get("WriteEvent").default(event)
        }
        return () => {
            // Write task end event
            if(experimentObject.scriptsMap){
                const endTimestamp = Date.now()-taskStartTimestamp
                const event = {timestamp:endTimestamp ,taskIndex:taskIndex, eventType:"End task", payload:""}
                experimentObject.scriptsMap.get("WriteEvent").default(event)
            }
            // Clear the event component data
            componentEventData = ""
        }
    },[taskIndex])

    // Set the render object using the current taskIndex
    let renderObject = null
    if(experimentObject.taskRenderObjects){
        renderObject = experimentObject.taskRenderObjects[taskIndex]
    }
        
    return (
        <callBacksContext.Provider value={experimentObject.scriptsMap}>
            <Suspense fallback={<p>Loading</p>}><div className="flex h-screen w-screen bg-sky-100 items-center justify-center">{renderObject}</div></Suspense>
        </callBacksContext.Provider>
    )
}

export default ModuleRenderComponent
