import React from 'react';
import './App.css';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import BodyAgentView from './components/BodyAgentView';
import BodyClusterControl from './components/BodyClusterControl';
import BodySwarmConfig from './components/BodySwarmConfig';
import BodyParameterControl from './components/BodyParameterControl';
import { createContext } from "react";

class LocationStore {
  gloabalPinLocationX =  1;
  gloabalPinLocationY = 1;

  setLocation = (X, Y) => {
    this.gloabalPinLocationX = X;
    this.gloabalPinLocationY = Y;
  }
}

export const LocationContext = createContext();

class App extends React.Component {
  
  constructor(props) {
    console.log("const");

    super(props)
    this.state = {body: "SwarmOverview", checkedAgents: [''], ignoreComps: [], LocationStore: new LocationStore()}

  }

  

  removeAgent= (input) => {
    var blackListed = this.state.ignoreComps
    blackListed.push(input)
    //console.log(blackListed)
    this.setState({
        ingnoreComps: blackListed
    })
    return 
}

  updateBody = (input) => {
    this.setState({body: input})
  }

  getBody = () => {
    switch(this.state.body) {
      case "SwarmOverview":
        return <BodyAgentView removeFun={this.removeAgent} ignoreComps={this.state.ignoreComps}/>
      case "ClusterControl":
        return <BodyClusterControl />
      case "SwarmConfig":
        return <BodySwarmConfig />
      case "ParameterControl":
        return <BodyParameterControl />
    }
  }

  render() {
    console.log("test");

    const body = this.getBody();
    return (
      <LocationContext.Provider value={this.state.LocationStore}>
        <div>
          <Header buttonFcn={this.updateBody} selected={this.state.body} />
          <LeftSideBar />
          {body}
        </div>
      </LocationContext.Provider>
    );
  }
}

export default App;
