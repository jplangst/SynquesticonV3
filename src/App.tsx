import {useState, useEffect, createContext, useContext} from 'react';
import { fetchExperiment } from "./Utils/Utils";
import CommunicationProvider from './Communication/communicationModule';
import {useCommunicationContext} from './Communication/communicationModule';
import RenderComponent from './RenderComponent';

const CommsContext = createContext<any>('local');
export const CurrentExperimentContext = createContext<any>(null);

function App() {
  const [currentExperiment, setCurrentExperiment] = useState(null);
  const [commMethods, setCommMethods] = useState(null);

  // Get any parameters encoded in the url
  const queryParameters = new URLSearchParams(window.location.search)
  const experimentName = queryParameters.get("exp") //Extract the experiment name

  // Attempt to load the experiment json file
  useEffect(() =>{
    fetchExperiment(setCurrentExperiment,experimentName)
  }, [])

  //useEffect(() =>{
  //  if(currentExperiment){
  //    console.log(currentExperiment.communicationMethod)
      
      //setCommMethods(useCommunicationContext());
      //connectionDetails = currentExperiment.communicationMethod 
      //connect(connectionDetails.uuid, connectionDetails.host, connectionDetails.port)
      //test.connect(currentExperiment.communicationMethod)
  //  }
  //}, [currentExperiment])

  

  //if(currentExperiment){
  //  const commDetails = currentExperiment.communicationMethod
  //  const commProvider = useCommunicationContext()
  //  commProvider.connect(commDetails.uuid, commDetails.host, commDetails.port)
  //}

  return (
    <CurrentExperimentContext.Provider value={{currentExperiment, setCurrentExperiment}}>
      <CommunicationProvider value={CommsContext}>
        <RenderComponent/>
      </CommunicationProvider>
    </CurrentExperimentContext.Provider>
  )
}

export default App
