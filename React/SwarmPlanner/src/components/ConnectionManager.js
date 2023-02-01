import React from 'react';
import '../styles/Connection.css'
import ConnectButton from './ConnectButton';
import DisconnectButton from './DisconnectButton';

class ConnectionManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {deviceList: [''], status: 'disconnected'};
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.check(),
          5000
        );
      }
    
    check() {
        fetch('http://127.0.0.1:8080/update_connection_data')
        .then((result) => result.json())
        .then((result) => {
            let connectionStatus = result[0].Connected;
            //console.log(connectionStatus)
            if (connectionStatus === "true") {
                this.setState({status: 'connected'})
            }
            else {
                this.setState({status: 'disconnected'})
            }
        })
    }

    connectClick = () => {
        var device = document.getElementById('SerialConnectList');
        var baud = document.getElementById('SerialBaudRate');
        var value = device.value;
        var baudrate = baud.value;
        fetch('http://127.0.0.1:8080/connect_to' + value + '/' + baudrate)
    }

    disconnectClick = () => {
        fetch('http://127.0.0.1:8080/disconnect')
    }

    get = () => {
        fetch('http://127.0.0.1:8080/update_connection_list')
        .then((result) => result.json())
        .then((result) => {
            const finalList = result.map( (device) => {
                return device.Device;
            })
            finalList.push("udpin:127.0.0.1:14551")
            this.setState({deviceList: finalList})
        })
    }

    getButton = () => {
        if (this.state.status === 'connected') {
            return <DisconnectButton buttonFcn={this.disconnectClick}/>
        } else {
            return <ConnectButton buttonFcn={this.connectClick}/>
        }
    }

    render() {
        const baudList = ["230400","57600","115200","921600"]

        let devices = this.state.deviceList.map( (device) => {
            return (
                <option value={device} key={device}>{device}</option>
            )
        })

        let bauds = baudList.map( (baud) => {
            return (
                <option value={baud} key={baud}>{baud}</option>
            )
        })

        const button = this.getButton();

        return(
            <div className="connection-manager-component">
                <div>
                    <select className="connection-drop-box" name="Connection" id="SerialConnectList" onClick={this.get}>
                        {devices}
                    </select>
                </div>
                <div>
                    <select className="connection-drop-box" name="Baud" id="SerialBaudRate">
                        {bauds}
                    </select>
                </div>
                {button}
            </div>
        )
    }

    
}

export default ConnectionManager;