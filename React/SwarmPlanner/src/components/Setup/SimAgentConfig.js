import React, {useState} from 'react'
import SensorConfig from './SensorConfig';
import '../../styles/TestStyles.css'


function SimAgentConfig() {

    const [vehicle, setVehicle] = useState('quadcopter');
    const [sensors, setSensors] = useState([]);


    const removeSensor = (index) => {
        const updatedSensors = sensors.filter((_,i) => i !== index);
        setSensors(updatedSensors);
        console.log("removing")
    }

    const addSensor = () => {
        const newSensor = <div key={sensors.length}><SensorConfig removeFunctoin={ () => removeSensor() }/></div>;
        setSensors([...sensors, newSensor]);
        console.log("adding")
     };
 
    
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
                <button>remove vehicle</button>
            </div>
        </div>
    );
}

export default SimAgentConfig