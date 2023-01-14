import React from 'react'
import '../styles/Connection.css'
class ConnectButton extends React.Component {
    render() {
        return (
            <div className="CONNECT" onClick={()=>{this.props.buttonFcn()}}>
                CONNECT
            </div>
        );
    }
}

export default ConnectButton;