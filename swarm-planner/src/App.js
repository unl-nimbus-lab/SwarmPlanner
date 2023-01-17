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
    this.state = {body: "SwarmOverview", checkedAgents: ['']}
  }

  updateBody = (input) => {
    this.setState({body: input})
  }

  getBody = () => {
    switch(this.state.body) {
      case "SwarmOverview":
        return <BodyAgentView />
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
        <Header buttonFcn={this.updateBody}/>
        <LeftSideBar />
        {body}
      </div>
    );
  }
}

export default App;
