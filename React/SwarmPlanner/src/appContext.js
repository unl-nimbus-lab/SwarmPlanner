import React, {useState, createContext} from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [body ,setBody] = useState('SwarmOverview');
  const [isConnected, setIsConnected] = useState(false);
  const [gcsAddress, setGCSAddress] = useState('http://127.0.0.1:8080');
  const [agentList, setAgentList] = useState([])
  const [devMode, setDevMode] = useState(true);

  const updateBody = (input) => {
    setBody(input);
  };

  const updateConnection = (input) => {
    setIsConnected(input);
  };

  const updateGCSAddress = (input) => {
    setGCSAddress(input);
  };

  const updateAgentList = (input) => {
    setAgentList(input);
  };

  const contextValues = {
    body,
    updateBody,
    isConnected,
    updateConnection,
    gcsAddress,
    updateGCSAddress,
    agentList,
    updateAgentList,
    devMode,
    setDevMode
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppContextProvider};