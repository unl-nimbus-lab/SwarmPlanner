import React from 'react'
import '../styles/AgentStatusCard.css'
// import '../styles/SingleValueInput.css'

class SingleValueInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x: 0}
    }

    handleChangeX = (event) => {
        this.setState({x: event.target.value})
    }

    render() {

        const handleClick = this.props.buttonFcn;

        return(
            <div className="AgentStatusCardSection-Regular">
                <label for={this.props.title}>{this.props.title + ":"} </label>
                <input onChange={this.handleChangeX} className="TextInput" type="text"></input>
                <button onClick={()=>handleClick(this.state.x)}>SEND</button>
            </div>

        );
    }
}

export default SingleValueInput;