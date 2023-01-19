import React from 'react'
import '../styles/AgentStatusCard.css'
import '../styles/ButtonStyles.css'
import '../styles/TextStyles.css'

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
                <label class="PanelSubLabel" for={this.props.title}>{this.props.title + ":"} </label>
                <input onChange={this.handleChangeX} className="TextInput" type="text"></input>
                <button class="SendButton" onClick={()=>handleClick(this.state.x)}>SEND</button>
            </div>

        );
    }
}

export default SingleValueInput;