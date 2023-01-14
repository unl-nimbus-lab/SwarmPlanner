import React from 'react'
import '../styles/Connection.css'
class DisconnectButton extends React.Component {
    render() {
        return (
            <div className="DISCONNECT" onClick={()=>{this.props.buttonFcn()}}>
                DISCONNECT
            </div>
        );
    }
}

export default DisconnectButton;