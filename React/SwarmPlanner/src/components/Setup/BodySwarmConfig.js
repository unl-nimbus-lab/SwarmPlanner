import React, {useState} from 'react'
import SimAgentConfig from './SimAgentConfig'
import SimOptions from './SimOptions'
import NumberSelect from '../common/inputs/NumberSelect';
import '../../styles/TestStyles.css'

function BodySwarmConfig() {

    const [simAgents, setSimAgents] = useState([]);
    const [gazebo, setGazebo] = useState(false);
    const [ros, setRos] = useState(false);
    const [ros2, setRos2] = useState(false);

    const NumberToArray = (number) => {
        // Generate an array with elements from 1 to the specified number
        const numberArray = Array.from({ length: number }, (_, index) => index + 1);
        setSimAgents(numberArray)
    }

    return(
        <div>
            <NumberSelect label="Number of Agents" onChange={NumberToArray}/>
            <div>
                {simAgents.map(agent => (
                    <SimAgentConfig key={agent} id={agent}/>
                ))}
            </div>
        </div>
    );
}

export default BodySwarmConfig;