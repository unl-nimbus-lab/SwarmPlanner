import React from 'react'
import '../styles/Connection.css'
import '../styles/ButtonStyles.css'

class ConnectButton extends React.Component {
    render() {
        return (
            <button className="ConnectButton" onClick={()=>{this.props.buttonFcn()}}>
                CONNECT
            </button>
        );
    }
}

export default ConnectButton;