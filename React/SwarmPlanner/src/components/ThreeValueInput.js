import React, { useState } from 'react'
import '../styles/AgentStatusCard.css'
import '../styles/ThreeValueInput.css'
import '../styles/ButtonStyles.css'
import '../styles/TextStyles.css'
import { useContext } from "react";
import { LocationContext } from '../App'

//Converted to Functional Component

const ThreeValueInput = (props) => {
    const locationStore = useContext(LocationContext);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);

    //Updates State if user input value X
    const handleChangeX = (event) => {
        setX(event.target.value)
        locationStore.setLocation(event.target.value, y)
    }
    
    //Updates State if user input value Y
    const handleChangeY = (event) => {
        locationStore.setLocation(x, event.target.value)
        setY(event.target.value)
    }

    const handleChangeZ = (event) => {
        setZ(event.target.value)
    }

    //Update State based off pin location
    const updatePlaceHolders = () => {
        setX(locationStore.globalPinLocationX);
        setY(locationStore.globalPinLocationY);
    }
     
    const handleClick = props.buttonFcn;
        return(
            <div className="AgentStatusCardSection-Regular">
            {/* <label class="PanelSubLabel" for="X">X: </label> */}
            <input placeholder={'X'} id='x' value={x} onChange={handleChangeX} className="TextInput" type="text"></input>
            {/* 
            <label class="PanelSubLabel" for="Y">Y: </label> */}
            <input placeholder={'Y'} id='y' value={y} onChange={handleChangeY} className="TextInput" type="text"></input>

            {/* <label class="PanelSubLabel" for="Z">Z: </label> */}
            <input placeholder="Z" id='z' onChange={handleChangeZ} className="TextInput" type="text"></input>
            <button className="SendButton" onClick={()=>{handleClick(x,y,z)}}>SEND</button>
            <button className="SendButton" onClick={updatePlaceHolders}>Pin</button>
            </div>
        );
    }

export default ThreeValueInput;