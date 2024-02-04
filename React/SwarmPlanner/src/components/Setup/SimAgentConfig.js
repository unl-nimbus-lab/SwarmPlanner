import React, {useState} from 'react'
import SensorConfig from './SensorConfig';
import '../../styles/TestStyles.css'


const SimAgentConfig = ({ id }) => {

    const [sensors, setSensors] = useState([]);
    const [idTrack, setIDTrack] = useState(1);

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

    return (
      <div className="Bodypink">
        SimAgent {id}
        <button onClick={addSensor}>
                Add Sensor
        </button>
        <div>
            {sensors.map(sensor => (
                <SensorConfig key={sensor.id} id={sensor.id} onRemove={removeSensor}/>
            ))}
        </div>
      </div>
    );
  };

export default SimAgentConfig