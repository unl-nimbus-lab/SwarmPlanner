import React from 'react'

class TakeoffButton extends React.Component {

    takeoff = () => {
        fetch('http://127.0.0.1:8080/takeoff/' + this.props.agentId + "_" + this.props.compId + "/" + this.props.altitude)
    }

    render() {
        return(
            <button onClick={this.takeoff}>TAKEOFF</button>
        );
    }
}

export default TakeoffButton;