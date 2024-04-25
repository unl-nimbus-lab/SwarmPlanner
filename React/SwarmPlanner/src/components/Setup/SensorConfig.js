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
        const temp = gazeboAgents;
        console.log(temp)
    };

    const handleOrientationChange = (event) => {
        setSensorOrientation(event.target.value);
    }

    const handlePositionChange = (event) => {
        setSensorPosition(event.target.value);
    }

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
            <button onClick={ ()=> console.log(sensorId)}>
                Whos                
            </button>
        </div>    
    )
}

export default SensorConfig