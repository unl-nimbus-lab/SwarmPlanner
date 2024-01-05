import React, {useState, createContext, useContext} from 'react';
import './App.css';
import Header from './components/main/header/Header';
import LeftSideBar from './components/main/leftsidebar/LeftSideBar';
import BodyAgentView from './components/Overview/BodyAgentView';
import AgentOverview from './components/Overview/AgentOverview';
import BodySwarmConfig from './components/Setup/BodySwarmConfig';
import BodyParameterControl from './components/Parameters/BodyParameterControl';
import {AppContext, AppContextProvider} from './appContext';

const App= () => {

  const {body, updateBody, isConnected, updateConnection} = useContext(AppContext);

  return(
      <div>
        <Header buttonFcn={updateBody} selected={body} />
        <LeftSideBar />
        {body == 'SwarmOverview' ? <AgentOverview /> : null}
        {body == 'SwarmConfig' ? <BodySwarmConfig /> : null}
        {body == 'ParameterControl' ? <BodyParameterControl /> : null}
      </div>
  );
}



// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {body: "SwarmOverview", checkedAgents: [''], ignoreComps: []}
//   }

//   removeAgent= (input) => {
//     var blackListed = this.state.ignoreComps
//     blackListed.push(input)
//     //console.log(blackListed)
//     this.setState({
//         ingnoreComps: blackListed
//     })
//     return 
// }AppContextPro

//   updateBody = (input) => {
//     this.setState({body: input})
//   }

//   getBody = () => {
//     switch(this.state.body) {
//       case "SwarmOverview":
//         return <AgentOverview />
//         //return <BodyAgentView removeFun={this.removeAgent} ignoreComps={this.state.ignoreComps}/>
//       case "SwarmConfig":
//         return <BodySwarmConfig />
//       case "ParameterControl":
//         return <BodyParameterControl />
//     }
//   }

//   render() {
    
//     const body = this.getBody();

//     return (
//       <div>
//         <Header buttonFcn={this.updateBody} selected={this.state.body} />
//         <LeftSideBar />
//         {body}
//       </div>
//     );
//   }
// }

export default App;
