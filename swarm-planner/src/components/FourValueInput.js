import React from 'react'
import '../styles/AgentStatusCard.css'

class FourValueInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', x: 0, y: 0, z:0}
    }

    handleChangeName = (event) => {
        this.setState({name: event.target.value})
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

                <label for="NAME">NAME: </label>
                <input id='name' onChange={this.handleChangeName} className="TextInput" type="text"></input>

                <label for="X">X: </label>
                <input id='x' onChange={this.handleChangeX} className="TextInput" type="text"></input>

                <label for="Y">Y: </label>
                <input id='y' onChange={this.handleChangeY} className="TextInput" type="text"></input>

                <label for="Z">Z: </label>
                <input id='z' onChange={this.handleChangeZ} className="TextInput" type="text"></input>

                <button onClick={ ()=>{handleClick(this.state.name,this.state.x,this.state.y,this.state.z)} }>SEND</button>
            </div>

        );
    }
}

export default FourValueInput;