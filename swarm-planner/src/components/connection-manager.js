import React from 'react';
import '../styles/Connection.css'

class ConnectionManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {deviceList: [''], status: 0};
        this.connectStyle = "CONNECT";
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
            if (connectionStatus === 1) {
                this.setState({status: 1})
            }
            else {
                this.setState({status: 0})
            }
        })
    }

    render() {
        const baudList = ["57600","230400","115200","921600"]

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
                <div className={this.connectStyle} onClick={this.handleConnectClick}>
                    {this.connectStyle}
                </div>
            </div>
        )
    }

    handleConnectClick = () => {
        if (this.state.status === 0) {
            var device = document.getElementById('SerialConnectList');
            var baud = document.getElementById('SerialBaudRate');
            var value = device.value;
            var baudrate = baud.value;
            fetch('http://127.0.0.1:8080/connect_to' + value + '/' + baudrate)
            this.connectStyle = 'DISCONNECT'
        } else if( this.state.status === 1) {
            fetch('http://127.0.0.1:8080/disconnect')
            this.connectStyle = 'CONNECT'
        }

    }

     get = () => {
        fetch('http://127.0.0.1:8080/update_connection_list')
        .then((result) => result.json())
        .then((result) => {
            const finalList = result.map( (device) => {
                return device.Device;
            })
            this.setState({deviceList: finalList})
        })
    }
}

export default ConnectionManager;