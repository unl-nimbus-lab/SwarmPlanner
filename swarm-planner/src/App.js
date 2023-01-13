import React from 'react';
import './App.css';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import AgentStatusCard from './components/AgentStatusCard';
import SwarmAgent from './classes/SwarmAgent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {agentList: []}
 }


 componentDidMount() {
  this.timerID = setInterval(
    () => this.check(),
    10000
  );}

  check = () => {
    fetch('http://127.0.0.1:8080/update_agents')
    .then((result) => result.json())
    .then((result) => {
        let swarmAgents = result.map( (agent) => {
          const tempAgent = new SwarmAgent(agent.agentId, agent.compId, agent.armStatus, agent.mode, agent.timeout, agent.altitude)
          //console.log(tempAgent)
          return tempAgent
        })
        this.setState({agentList: swarmAgents}, () => {
          //console.log(this.state.agentList)
        })
    })
  }

   render() {
    let agents = this.state.agentList.map( (agent) => {
      return  (
        <AgentStatusCard key={agent.getId()} agentId={agent.getId()} compId={agent.getCId()} flightMode={agent.getFlightMode()} armStatus={agent.getArmStatus()} altitude={agent.getAltitude() } />
      )
    })

    return (
      <div>
        {/* fixed */}
        <Header />
        <LeftSideBar />
        <RightSideBar />
        <div className='layout-helper1'>
          {agents}
        </div>
        <div className='layout-helper2'>
          big div 2
        </div>
      </div>
    );
  }
}

export default App;
