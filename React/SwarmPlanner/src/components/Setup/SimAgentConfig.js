import React, {useState} from 'react'
import SensorConfig from './SensorConfig';
import '../../styles/TestStyles.css'


function SimAgentConfig() {

    const [vehicle, setVehicle] = useState('quadcopter');
    const [sensors, setSensors] = useState([<SensorConfig />]);

    const addSensor = () => {
        var newSensor = sensors;
        newSensor.push(<SensorConfig />);
        setSensors(newSensor)
        console.log("added sensor")
    }

    return (
        <div className='Bodypink'>
            <div>
                get even more fukt
            </div>
            <div>
                <select id="vehicle" onChange={e => setVehicle(e.target.value)}>
                    <option value="quadcopter">quadcopter</option>
                </select>
            </div>
            <div>
                <button onClick={addSensor} >add sensor</button>
            </div>
            <div>
                {sensors}
            </div>
            <div>
                <button>remove vehicle</button>
            </div>
        </div>
    );
}

export default SimAgentConfig