import React from 'react'
import '../../../styles/ButtonStyles.css'

class DisarmButton extends React.Component {

    disarm = () => {
        if (this.props.agentId === undefined) {
            fetch('http://127.0.0.1:8080/disarm')
        } else {
            fetch('http://127.0.0.1:8080/disarm/' + this.props.agentId + "_" + this.props.compId)
        }

    }
    render() {
        return (
            <button className={this.props.class} onClick={this.disarm}>DISARM</button>
        )
    }
}
export default DisarmButton;