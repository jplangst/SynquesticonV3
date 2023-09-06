import { lazy } from 'react'
import { v4 as uuidv4 } from 'uuid';

function createOutput(tasks:any, taskIndex:number){
    const moduleMap = new Map()
    const renderModules:any = []
    const scripts:any = []
    tasks.forEach((element:any) =>{
        if (!moduleMap.has(element.module))
            moduleMap.set(element.module, lazy( () => import(`../Modules/${element.module}.tsx`)))
    
        if (element.type == "CODE") { // check if module is react component or code
            return
        }
        else if(element.type == "COMPONENT"){
            element.props.taskIndex = taskIndex;
            const Component = moduleMap.get(element.module);
            renderModules.push(<li key={uuidv4()}><Component  lazyProps={element.props} /></li>)         
        }
        else{
            console.log("Unknown module type:"+element.type)
            return
        } 
        
    })
    return renderModules
}

// Takes a list of tasks and for each task creates a react element.
export default function getTaskTable(jsonTaskList:any){
    let taskTable:any = <div>Error with the passed tasks</div>; 
    if(jsonTaskList){
        taskTable = jsonTaskList.map((tasks:any, taskListIndex:number) => {
            //Create ouput was wrapped in a list tag before
            return(
                <ul className="mb-2 border-1 border-sky-50 sky400" key={uuidv4()}>
                    {
                        createOutput(tasks, taskListIndex)
                    }
                </ul>
            )
        });
    }
    return taskTable
}
