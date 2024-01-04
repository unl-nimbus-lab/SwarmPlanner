import React, {useState} from 'react';
import './App.css';
import Header from './components/main/header/Header';
import LeftSideBar from './components/main/leftsidebar/LeftSideBar';
import BodyAgentView from './components/Overview/BodyAgentView';
// import BodyClusterControl from './components/BodyClusterControl';
import BodySwarmConfig from './components/Setup/BodySwarmConfig';
import BodyParameterControl from './components/Parameters/BodyParameterControl';

// function App() {

//   const [body, setBody] = useState("SwarmOverview");
//   const [checkedAgents, setCheckedAgents] = useState(['']);
//   const [ignoreComps, setIgnoreComps] = useState([]);

//   const removeAgent = (input) => {
//     var blackListed = ignoreComps
//     blackListed.push(input)
//     //console.log(blackListed)
//     setIgnoreComps(blackListed)
//     return 
// }

//   const updateBody = (input) => {
//     setBody(input)
//   }

//   const getBody = () => {
//     switch(body) {
//       case "SwarmOverview":
//         return <BodyAgentView removeFun={removeAgent} ignoreComps={ignoreComps}/>
//       // case "ClusterControl":
//       //   return <BodyClusterControl />
//       case "SwarmConfig":
//         return <BodySwarmConfig />
//       case "ParameterControl":
//         return <BodyParameterControl />
//     }
//   }

//   return (
//     <div>
//       <Header buttonFcn={updateBody} selected={body} />
//       <LeftSideBar />
//       {body}
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {body: "SwarmOverview", checkedAgents: [''], ignoreComps: []}
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
      // case "ClusterControl":
      //   return <BodyClusterControl />
      case "SwarmConfig":
        return <BodySwarmConfig />
      case "ParameterControl":
        return <BodyParameterControl />
    }
  }

  render() {
    
    const body = this.getBody();

    return (
      <div>
        <Header buttonFcn={this.updateBody} selected={this.state.body} />
        <LeftSideBar />
        {body}
      </div>
    );
  }
}

export default App;
