import react from 'react'
import '../../styles/TestStyles.css'

function SensorConfig(props) {
    return (
        <div className="Bodyblue">
            sensor
            <button onClick={props.removefunction}>X</button>
        </div>    
    )
}

export default SensorConfig