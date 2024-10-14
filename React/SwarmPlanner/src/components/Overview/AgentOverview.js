import react , {useState, useEffect, useContext} from 'react'
import AgentStatusCard from './AgentStatusCard'
import SwarmAgnet from '../../classes/SwarmAgent'
import '../../styles/BodyAgentView.css'
import MapContainer from './MapContainer'
import {AppContext} from '../../appContext'

function BodyAgentView(props) {
    
    const {gcsAddress, updateGCSAddress, agentList, updateAgentList,devMode} = useContext(AppContext);

    //Create a timer to periodically update the agent list
    useEffect( 
        () =>{
            const agentUpdateTimer = setInterval(
                () => check(),25000
            );
        },
        []
    );

    const updateAgents = () => {
        console.log("updating agents")
    }

    const check = () => {
        if (devMode === true) {

        } else {
            fetch(gcsAddress + '/update_agents')
            .then((result) => result.json())
            .then((result) => {
                let swarmAgents = result.map( (agent) => {
                const tempAgent = new SwarmAgnet(agent.agentId, agent.compId, agent.armStatus, agent.mode, agent.timeout, agent.altitude, agent.latitude, agent.longitude)
                //console.log(tempAgent)
                return tempAgent
                })
                updateAgentList(swarmAgents)
            })
        }    
    }

    let agents = agentList.map( (agent) => {
        // if (props.ignoreComps.includes(agent.getCId())) {
        //   return null
        // }
        return  (
          <AgentStatusCard  key={agent.getId()} 
                            agentId={agent.getId()} 
                            compId={agent.getCId()} 
                            flightMode={agent.getFlightMode()} 
                            armStatus={agent.getArmStatus()} 
                            altitude={agent.getAltitude()} 
                            timeout={agent.getTimeout()} 
                            removeFun={props.removeFun}  />
        )
      })

    return(
        <div className="Body">
            <div className="BodyAgentView">
                {agents}
            </div>
            <div className="BodyMap">
                <MapContainer agents={agentList}/>
            </div>
        </div>
    );
}

export default BodyAgentView