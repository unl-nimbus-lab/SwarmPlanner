import React, {useState, useContext} from 'react'
import SensorConfig from './SensorConfig';
import '../../styles/TestStyles.css'
import {agentContext} from './BodySwarmConfig'


const SimAgentConfig = ({ id }) => {

    const [sensors, setSensors] = useState([]);
    const [idTrack, setIDTrack] = useState(1);

    const {gazeboAgents,setGazeboAgents} = useContext(agentContext)

    const addSensor = () => {
        
        const newId = idTrack;
        setIDTrack(idTrack + 1);

        setSensors(prevSensors => [
            ...prevSensors, {id: newId}
        ]);
    };

    const removeSensor = (idToRemove) => {
        setSensors(prevSensors => 
            prevSensors.filter(child => child.id !== idToRemove)
        );
    };

    const handleFuck = () => {
        console.log(gazeboAgents)
    }

    return (
            <div className="Bodypink">
            SimAgent {id}

            <button onClick={handleFuck}>FUCK</button>
        
            <button onClick={addSensor}>
                Add Sensor
            </button>
            <div>
                {sensors.map(sensor => (
                    <SensorConfig key={sensor.id} agentId={id} sensorId={sensor.id} onRemove={removeSensor}/>
                    ))}
                </div>
            </div>
    );
  };

export default SimAgentConfig