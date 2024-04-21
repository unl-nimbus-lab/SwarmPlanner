import react, {useState} from 'react'

function GazeboSelect( {sendGazeboUp} ) {
    const [gazebo, setGazebo] = useState("FALSE");

    const handleGazeboChange = (event) => {
        setGazebo(event.target.value);
        sendGazeboUp(event.target.value);
    }

    return(
        <div>
            <label>Gazebo Options: </label>
            <select value={gazebo} onChange={handleGazeboChange}>
                <option value="FALSE">No Gazebo</option>
                <option value="TRUE">Use Gazebo</option>
            </select>
        </div>
    );
}

export default GazeboSelect