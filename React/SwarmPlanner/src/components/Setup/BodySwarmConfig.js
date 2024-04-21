import React, {useState} from 'react'
import SimAgentConfig from './SimAgentConfig'
import SimOptions from './SimOptions'
import NumberSelect from '../common/inputs/NumberSelect';
import RosSelect from './RosSelect';
import '../../styles/TestStyles.css'
import GazeboSelect from './GazeboSelect';

function BodySwarmConfig() {

    const [simAgents, setSimAgents] = useState([]);
    const [numberOfAgents, setNumberOfAgents] = useState(0);
    const [gazebo, setGazebo] = useState("FALSE");
    const [ros, setRos] = useState("NONE");

    const handleSetRos = (data) => {
        setRos(data);
    }

    const handleSetGazebo = (data) => {
        setGazebo(data);
    }

    const NumberToArray = (number) => {
        // Generate an array with elements from 1 to the specified number
        const numberArray = Array.from({ length: number }, (_, index) => index + 1);
        setSimAgents(numberArray)
        setNumberOfAgents(number)
    }

    const data = {
        "NUMBER_OF_AGENTS": numberOfAgents,
        "ROS": ros,
        "GAZEBO": gazebo,
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const url = 'http://127.0.0.1:8080/generate_compose_data';

    const handleClick = () => {
        fetch(url,requestOptions)
    }

    return(
        <div>
            <NumberSelect label="Number of Agents" onChange={NumberToArray}/>
            <div>
                {simAgents.map(agent => (
                    <SimAgentConfig key={agent} id={agent}/>
                ))}
            </div>
            <div>
                <RosSelect sendUp={handleSetRos}/>
            </div>
            <div>
                <GazeboSelect sendGazeboUp={handleSetGazebo}/>
            </div>
            <button onClick={handleClick} >
                Generate Simulation Compose
            </button>
        </div>
    );
}

export default BodySwarmConfig;