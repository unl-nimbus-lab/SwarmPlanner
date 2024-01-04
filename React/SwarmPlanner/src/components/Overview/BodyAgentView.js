import React from 'react'
import AgentStatusCard from './AgentStatusCard';
import SwarmAgent from '../../classes/SwarmAgent'
import '../../styles/BodyAgentView.css'
import MapContainer from './MapContainer';

class BodyAgentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {agentList: []}
     }
    
     componentDidMount() {
        this.timerID = setInterval(
          () => this.check(),
          500
        );}
      
    check = () => {
        fetch('http://127.0.0.1:8080/update_agents')
        .then((result) => result.json())
        .then((result) => {
            let swarmAgents = result.map( (agent) => {
            const tempAgent = new SwarmAgent(agent.agentId, agent.compId, agent.armStatus, agent.mode, agent.timeout, agent.altitude, agent.latitude, agent.longitude)
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
            if (this.props.ignoreComps.includes(agent.getCId())) {
              return null
            }
            return  (
              <AgentStatusCard  key={agent.getId()} 
                                agentId={agent.getId()} 
                                compId={agent.getCId()} 
                                flightMode={agent.getFlightMode()} 
                                armStatus={agent.getArmStatus()} 
                                altitude={agent.getAltitude()} 
                                timeout={agent.getTimeout()} 
                                removeFun={this.props.removeFun}  />
            )
          })

        return(
            <div className="Body">
                <div className="BodyAgentView">
                    {agents}
                </div>
                <div className="BodyMap">
                    <MapContainer agents={this.state.agentList}/>
                </div>
            </div>

        );
    }
}

export default BodyAgentView;