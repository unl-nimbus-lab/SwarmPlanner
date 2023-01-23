import React from 'react';
import './App.css';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import BodyAgentView from './components/BodyAgentView';
import BodyClusterControl from './components/BodyClusterControl';
import BodySwarmConfig from './components/BodySwarmConfig';

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
      case "ClusterControl":
        return <BodyClusterControl />
      case "SwarmConfig":
        return <BodySwarmConfig />
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
