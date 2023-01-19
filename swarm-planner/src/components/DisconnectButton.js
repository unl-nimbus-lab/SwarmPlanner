import React from 'react'
import '../styles/Connection.css'
import '../styles/ButtonStyles.css'
class DisconnectButton extends React.Component {
    render() {
        return (
            <button className="DisconnectButton" onClick={()=>{this.props.buttonFcn()}}>
                DISCONNECT
            </button>
        );
    }
}

export default DisconnectButton; 