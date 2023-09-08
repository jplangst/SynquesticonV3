import { lazy } from 'react'
import { v4 as uuidv4 } from 'uuid';

const dynamicScriptsMap = new Map()
const codeModulesMap = new Map()

async function parseModules(tasks:any, taskIndex:number){ 
    const moduleMap = new Map()
    const renderModules:any = [] 
    await ( tasks.forEach(async (element:any) =>{
        // Adds new component modules and scripts to lookup maps
        if (!moduleMap.has(element.module) || !dynamicScriptsMap.has(element.module)){
            if(element.type == "COMPONENT"){
                const importedModule = lazy( () => import(`./Modules/${element.module}.tsx`))
                moduleMap.set(element.module, importedModule)
            }
            else if(element.type == "CODE"){
                try{
                    const dynamicScript = await import(`./Scripts/${element.module}.tsx`)
                    dynamicScriptsMap.set(element.module, dynamicScript)
                }
                catch(e){console.log("Failed to load script dynamically:"+element.module)}
            }
        }

        // Creates render component modules using the map, passing props from the json file in the process
        if(element.type == "COMPONENT"){
            element.props.taskIndex = taskIndex;
            const Component = moduleMap.get(element.module);
            renderModules.push(<Component key={uuidv4()} lazyProps={element.props} />)         
        }
        else if(element.type == "CODE"){ //Adds the code module to the code modules map which is used to get and call functions with props from the json file
            //If the element already exist in the map we get it and append to it
            if(codeModulesMap.has(taskIndex)){
                let existingEntry = codeModulesMap.get(taskIndex)
                existingEntry.push({module:element.module,props:element.props})
                codeModulesMap.set(taskIndex,existingEntry)
            }
            else{ //Otherwise we add a new entry to the map
                codeModulesMap.set(taskIndex,[{module:element.module,props:element.props}])
            }   
        }
        else{
            console.log("Unknown module type:"+element.type)
            return
        }        
    })
    )

    return renderModules
}

// Takes a list of tasks and for each task creates a react element.
export default async function getExperimentData(jsonTaskList:any){
    let componentModules:any = <div>No tasks provided or error loading the tasks</div>; 
    if(jsonTaskList){
        componentModules = await Promise.all( jsonTaskList.map(async (tasks:any, taskListIndex:number) => {
            return(
                <ul className="mb-2 border-1 border-sky-50 sky400" key={uuidv4()}>
                    {
                        await parseModules(tasks, taskListIndex)
                    }
                </ul>
            )
        }));
    }

    return [dynamicScriptsMap, codeModulesMap, componentModules]
}
