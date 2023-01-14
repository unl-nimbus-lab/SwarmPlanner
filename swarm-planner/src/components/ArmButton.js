import React from 'react'

class ArmButton extends React.Component {

    arm = () => {
        if (this.props.agentId === undefined) {
            fetch('http://127.0.0.1:8080/arm')
        } else {
            fetch('http://127.0.0.1:8080/arm/' + this.props.agentId + "_" + this.props.compId)
        }

    }
    render() {
        return (
            <button onClick={this.arm}>ARM</button>
        )
    }
}
export default ArmButton;