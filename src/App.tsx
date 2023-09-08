import {useState, useEffect, createContext} from 'react';
import { fetchExperiment } from "./Utils/Utils";
import CommunicationProvider from './Communication/communicationModule';
import ModuleRenderComponent from './ModuleRenderComponent';

const CommsContext = createContext<any>('local');
export const CurrentExperimentContext = createContext<any>(null);

function App() {
  const [currentExperiment, setCurrentExperiment] = useState(null);

  // Get any parameters encoded in the url
  const queryParameters = new URLSearchParams(window.location.search)
  const experimentName = queryParameters.get("exp") //Extract the experiment name

  // Load the experiment json file on start
  useEffect(() =>{
    fetchExperiment(setCurrentExperiment,experimentName)
  }, [])

  return (
    <CurrentExperimentContext.Provider value={{currentExperiment, setCurrentExperiment}}>
      <CommunicationProvider value={CommsContext}>
        <ModuleRenderComponent/>
      </CommunicationProvider>
    </CurrentExperimentContext.Provider>
  )
}

export default App
