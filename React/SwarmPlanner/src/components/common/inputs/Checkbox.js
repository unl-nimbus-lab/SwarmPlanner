import react , {useState} from 'react'
import '../../../styles/TestStyles.css'

function Checkbox(props) {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div className="Bodyblue">
            <label>
                <input type="checkbox" checked={isChecked} onChange={handleChange} />
                {props.label}
            </label>
        </div>
    )
}

export default Checkbox