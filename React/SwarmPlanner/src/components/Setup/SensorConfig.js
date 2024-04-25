import {react, useState, useContext, useEffect} from 'react'
import '../../styles/TestStyles.css'
import {agentContext} from './BodySwarmConfig'



const SensorConfig = ({agentId,sensorId,onRemove}) => {

    const [sensorType, setSensorType] = useState('');
    const [sensorPosition, setSensorPosition] = useState('')
    const [sensorOrientation, setSensorOrientation] = useState('')

    //Imported context
    const {gazeboAgents, setGazeboAgents} = useContext(agentContext)


    const handleSelectChange = (event) => {
        setSensorType(event.target.value);
    };

    const handleOrientationChange = (event) => {
        setSensorOrientation(event.target.value);
    }

    const handlePositionChange = (event) => {
        setSensorPosition(event.target.value);
    }

    useEffect( () => {
        //Create the sensor Array, make a copy of the entire state, update the copy and reset teh state
        const tempSensor = [sensorType,sensorPosition,sensorOrientation];
        //console.log(temp)
        const tempState = gazeboAgents;
        tempState[agentId-1].sensors[sensorId-1] = tempSensor;
        setGazeboAgents(tempState);

    }, [sensorType,sensorOrientation,sensorPosition]
    )

    return (
        <div className="Bodyblue">
            Im sensor {sensorId}
            <select id="sensorType" value={sensorType} onChange={handleSelectChange}>
                <option value="">Select Sensor Type</option>
                <option value="camera">camera</option>
                <option value="sonar">sonar</option>
                <option value="lidar">lidar</option>
            </select>
            <select id="sensorPosition" value={sensorPosition} onChange={handlePositionChange}>
                <option value="">Select Sensor Position</option>
                <option value="front">front</option>
                <option value="back">back</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="top">top</option>
                <option value="botton">bottom</option>
            </select>
            <select id="sensorOrientation" value={sensorOrientation} onChange={handleOrientationChange}>
                <option value="">Select Sensor Orientation</option>
                <option value="forward">forward</option>
                <option value="backward">backward</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="up">up</option>
                <option value="down">down</option>
            </select>
            <button onClick= { ()=> 
            // console.log(sensorType,sensorOrientation,sensorPosition) 
            onRemove(sensorId)
            }>
                X
            </button>
        </div>    
    )
}

export default SensorConfig