import React, {useState, useEffect, createContext} from 'react'
import SimAgentConfig from './SimAgentConfig'
import SimOptions from './SimOptions'
import NumberSelect from '../common/inputs/NumberSelect';
import RosSelect from './RosSelect';
import '../../styles/TestStyles.css'
import GazeboSelect from './GazeboSelect';

//Going to use this context so the SimAgentConfig component can access the state of the agents
export const agentContext = createContext();

function BodySwarmConfig() {
    
    // Sim agents are just for mutating the agent context and adding sensors 
    const [simAgents, setSimAgents] = useState([]);
    
    const [numberOfAgents, setNumberOfAgents] = useState(1);//Potentially need to remove since we have simAgents
    const [gazebo, setGazebo] = useState("FALSE"); //Gazebo Flag
    const [world, setWorld] = useState(null); //World flag, should only be seen if gazebo is true
    const [ros, setRos] = useState("NONE"); //ROS Flag, TODO: add ROS2 Option

    //Agent component for storing gazebo agent data
    function Agent(id) {
        this.id = id;
        this.frame = "iris";
        this.sensors = [];
    }

    //Gazebo agents is a list of agents, the agent frame and the sensors from the agent object
    const [gazeboAgents, setGazeboAgents] = useState([ new Agent(1) ])

    const handleSetRos = (data) => {
        setRos(data);
    }

    const handleSetGazebo = (data) => {
        setGazebo(data);
    }

    //This basically setsup the simAgentConfig components 
    const NumberToArray = (number) => {
        // Generate an array with elements from 1 to the specified number
        const numberArray = Array.from({ length: number }, (_, index) => index + 1);
        setSimAgents(numberArray)
        setNumberOfAgents(number)
    }

    //This is where the gazebo agent configurations are actually stored
    const NumberToSwarm = (number) => {
        // Generate an array with elements from 1 to the specified number
        const numberArray = Array.from({ length: number }, (_, index) => index + 1);
        const swarm = numberArray.map((agent) => new Agent(agent));
        setGazeboAgents(swarm)
    }

    //Data to be sent to the backend
    const data = {
        "NUMBER_OF_AGENTS": numberOfAgents,
        "ROS": ros,
        "GAZEBO": gazebo,
        "WORLD": world,
    };

    //Request options for the fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    //URL for the fetch
    const url = 'http://127.0.0.1:8080/generate_compose_data';

    //Fetch function
    const handleClick = () => {
        console.log(gazeboAgents)
        fetch(url,requestOptions)
    }

    //This useEffect is used to update the data object with the latest values of the state
    useEffect(() => {
        data.NUMBER_OF_AGENTS = numberOfAgents;
        data.ROS = ros;
        data.GAZEBO = gazebo;

        if (gazebo === "TRUE") {
            data.WORLD = "runway.world";
            setWorld("runway.world");
        } else {
            setWorld(null);
            data.WORLD = null;
        }
        
        NumberToSwarm(numberOfAgents);
        NumberToArray(numberOfAgents);

        console.log(data);

    }, [ numberOfAgents, ros, gazebo])



    return(
        <div>
            <agentContext.Provider value = {{gazeboAgents,setGazeboAgents}} >

                <NumberSelect label="Number of Agents" onChange={NumberToArray}/>

                <div>
                    <RosSelect sendUp={handleSetRos}/>
                </div>
                <div>
                    <GazeboSelect sendGazeboUp={handleSetGazebo}/>
                </div>
                
                {gazebo === "TRUE" ? <div>{simAgents.map(agent => (<SimAgentConfig key={agent} id={agent}/>))}</div> : null}

                <button onClick={handleClick} >
                    Generate Simulation Compose
                </button>

            </agentContext.Provider>
        </div>
    );
}

export default BodySwarmConfig;

