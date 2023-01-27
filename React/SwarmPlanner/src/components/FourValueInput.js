import React from 'react'
import '../styles/AgentStatusCard.css'
import '../styles/ButtonStyles.css'

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

                <input id='name' onChange={this.handleChangeName} className="TextInput-Small" placeholder="NAME" type="text"></input>

                <input id='x' onChange={this.handleChangeX} className="TextInput-Small" placeholder="X" type="text"></input>

                <input id='y' onChange={this.handleChangeY} className="TextInput-Small" placeholder="Y" type="text"></input>

                <input id='z' onChange={this.handleChangeZ} className="TextInput-Small" placeholder="Z" type="text"></input>

                <button className="SendButton" onClick={ ()=>{handleClick(this.state.name,this.state.x,this.state.y,this.state.z)} }>SEND</button>
            </div>

        );
    }
}

export default FourValueInput;