import React from 'react'
import '../../../styles/AgentStatusCard.css'
import '../../../styles/ThreeValueInput.css'
import '../../../styles/ButtonStyles.css'
import '../../../styles/TextStyles.css'

class ThreeValueInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x: 0, y: 0, z: 0}
    }

    handleChangeX = (event) => {
        this.setState({x: event.target.value})
    }

    handleChangeY = (event) => {
        this.setState({y: event.target.value})
    }

    handleChangeZ = (event) => {
        this.setState({z: event.target.value})
    }
    render() {
        const handleClick = this.props.buttonFcn;
        
        return(
            <div className="AgentStatusCardSection-Regular">

                {/* <label class="PanelSubLabel" for="X">X: </label> */}
                <input placeholder="X" id='x' onChange={this.handleChangeX} className="TextInput" type="text"></input>
{/* 
                <label class="PanelSubLabel" for="Y">Y: </label> */}
                <input placeholder="Y" id='y' onChange={this.handleChangeY} className="TextInput" type="text"></input>

                {/* <label class="PanelSubLabel" for="Z">Z: </label> */}
                <input placeholder="Z" id='z' onChange={this.handleChangeZ} className="TextInput" type="text"></input>
                <button className="SendButton" onClick={()=>{handleClick(this.state.x, this.state.y, this.state.z)}}>SEND</button>
            </div>

        );
    }
}

export default ThreeValueInput;