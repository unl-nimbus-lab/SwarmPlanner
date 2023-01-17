import React from 'react'

class ModeButton extends React.Component {

    setMode = () => {
        if ("agentId" in this.props && "compId" in this.props) {
            fetch('http://127.0.0.1:8080/set_mode/' + this.props.mode + '/' + this.props.agentId +"_" + this.props.compId)
        } else {
            fetch('http://127.0.0.1:8080/set_mode/' + this.props.mode)
        }
        
    }

    render() {
        return(
            <button onClick={this.setMode}>{this.props.mode}</button>
        );
    }
}

export default ModeButton