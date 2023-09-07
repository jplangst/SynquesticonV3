import { v4 as uuidv4 } from 'uuid';
import { setUUID } from '../Logging/loggingModule';

// Load the provided experiment json file from the server. If none is provided loads the default experiment. 
// Also generated a user UUID
export async function fetchExperiment(callback:any,filepath:string|null){
    let response;
    if(filepath) 
        response = await fetch("Experiments/"+filepath+".json");
    else
        response = await fetch("Experiments/defaultExperiment.json");

    const data = await response.text();
    let parsedData = JSON.parse(data);
    parsedData.UUID = uuidv4();
    setUUID(parsedData.UUID )
    callback(parsedData);
}

// Calls a function script that was dynamically loaded if the task index exists in the code modules list and the run type is correct
export function callScript(experimentObject:any, taskIndex:number, runType:string){
    const codeModulesMap = experimentObject.codeModulesMap
    if(codeModulesMap.has(taskIndex)){
        const codeModules = codeModulesMap.get(taskIndex)
        for(const codeModuleIndex in codeModules){
            const codeModule = codeModules[codeModuleIndex]
            if(codeModule.props.runType == runType){
                let dynFunction = experimentObject.scriptsMap.get(codeModule.module).default

                if(codeModule.props.functionInput){
                    dynFunction(codeModule.props.functionInput)
                }
                else{
                    dynFunction()
                }
            }
        }
    }
}