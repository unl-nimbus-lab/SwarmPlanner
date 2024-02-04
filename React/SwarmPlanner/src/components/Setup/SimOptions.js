import react , {useState} from 'react'
import Checkbox from '../common/inputs/Checkbox';

function SimOptions() {
    const [numberOfAgents, setNumberOfAgents] = useState(0);

    const handleAgentNumberChange = (event) => {
        const value = event.target.value.replace(/\D/,'');
        setNumberOfAgents(value);
    }

    return(
        <div>
            <div className="Bodyblue">
                <label>Number of Agents: </label>
                <input 
                    type="number"
                    id="agentNumber"
                    value={numberOfAgents} 
                    onChange={handleAgentNumberChange}
                    min="0"
                />
            </div>
            <Checkbox label="gazebo"/>
            <Checkbox label="ros"/>
            <Checkbox label="ros2"/>
        </div>
    );
};

export default SimOptions