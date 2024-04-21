import react, {useState} from 'react'

function RosSelect( {sendUp} ) {
    const [ros, setRos] = useState("NONE");

    const handleRosChange = (event) => {
        setRos(event.target.value);
        sendUp(event.target.value);
    }

    return(
        <div>
            <label>ROS: </label>
            <select value={ros} onChange={handleRosChange}>
                <option value="NONE">No ROS</option>
                <option value="ROS1">ROS1</option>
                {/* <option value="ROS2">ROS2</option> */}
            </select>
        </div>
    );
}

export default RosSelect