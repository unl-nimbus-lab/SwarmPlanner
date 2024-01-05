import React , {useState, useEffect, useContext} from 'react';
import '../../../styles/Connection.css'
import ConnectButton from '../../common/buttons/ConnectButton';
import DisconnectButton from '../../common/buttons/DisconnectButton';
import {AppContext} from "../../../appContext";

const ConnectionManager = () => {

    //We'll use the AppContext in this component
    const {isConnected, updateConnection, gcsAddress, updateGCSAddress, devMode} = useContext(AppContext);
    const [deviceList, setDeviceList] = useState([]);

    //Create a timer that will check for new connection data every X seconds
    useEffect(
        ()=>{
            const connectionUpdateTimer = setInterval(
                () => checkConnection(), 5000
            );
        },
        []
    );

    //Check the MAVLINK connection status
    const checkConnection = async () => {
        if (devMode === true) {
            
        } else {
            try {
                const response = await fetch(gcsAddress + '/update_connection_data');

                if (!response.ok) {
                    throw new Error('HTTP error! Status: ${response.status');
                    return;
                }

                const result = await response.json();
                let connectionStatus = result[0].Connected;
                //console.log(connectionStatus)
                if (connectionStatus === "true") {
                    updateConnection(true);
                } else {
                    updateConnection(false);
                }

            } catch (error) {
                console.error("Is the GCS running?");
                return;
            }
        }
    };

    //Signals the GCS to connect the selected devices
    const connectClick = async () => {
        var device = document.getElementById('SerialConnectList');
        var baud = document.getElementById('SerialBaudRate');
        var value = device.value;
        var baudrate = baud.value;
        try {
            const response = await fetch(gcsAddress + '/connect_to' + value + '/' + baudrate);

            if (!response.ok) {
                throw new Error('HTTP error! Status: ${response.status');
            }
        } catch (error) {
            console.error("Is the GCS running?");
            return;
        }
    };

    //Signals the GCS to disconnect
    const disconnectClick = () => {
        fetch(gcsAddress + '/disconnect')
    }

    //Figure out which button to use
    const getButton = () => {
        if (isConnected === 'connected') {
            return <DisconnectButton buttonFcn={disconnectClick}/>
        } else {
            return <ConnectButton buttonFcn={connectClick}/>
        }
    };

    //Get the list of devices from the GCS
    let devices = deviceList.map( (device) => {
        return (
            <option value={device} key={device}>{device}</option>
        )
    });

    //Set the button type (is there a better way to do this?)
    const button = getButton();

    //Get the list of devices from the GCS
    const get = async () => {
        try {
            const response = await fetch(gcsAddress + '/update_connection_list');
            
            if (!response.ok) {
                throw new Error('HTTP error! Status: ${response.status');
            }

            const finalList = response.map( (device) => {
                return device.Device;
            })
            finalList.push("/UDP")
            finalList.push("/TCP")
            setDeviceList(finalList);
        
        } catch (error) {
            console.error("Is the GCS running?")
            return;
        }
    }

    return(
        <div className="connection-manager-component">
            <div>
                <select className="connection-drop-box" name="Connection" id="SerialConnectList" onClick={get}>
                    {devices}
                </select>
            </div>
            <div>
                <input className="connection-drop-box" name="Baud" id="SerialBaudRate" defaultValue="udpin:127.0.0.1:4242">
                
                </input>
            </div>
            {button}
        </div>
    );
}

// class ConnectionManager extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {deviceList: [''], status: 'disconnected'};
//     }

//     componentDidMount() {
//         this.timerID = setInterval(
//           () => this.check(),
//           5000
//         );
//       }
    
//     check() {
//         fetch('http://127.0.0.1:8080/update_connection_data')
//         .then((result) => result.json())
//         .then((result) => {
//             let connectionStatus = result[0].Connected;
//             //console.log(connectionStatus)
//             if (connectionStatus === "true") {
//                 this.setState({status: 'connected'})
//             }
//             else {
//                 this.setState({status: 'dis    
//connectClick = () => {
//     var device = document.getElementById('SerialConnectList');
//     var baud = document.getElementById('SerialBaudRate');
//     var value = device.value;
//     var baudrate = baud.value;
//     fetch('http://127.0.0.1:8080/connect_to' + value + '/' + baudrate)
// }

// disconnectClick = () => {
//     fetch('http://127.0.0.1:8080/disconnect')
//}
//         fetch('http://127.0.0.1:8080/connect_to' + value + '/' + baudrate)
//     }

//     disconnectClick = () => {
//         fetch('http://127.0.0.1:8080/disconnect')
//     }

//     get = () => {
//         fetch('http://127.0.0.1:8080/update_connection_list')
//         .then((result) => result.json())
//         .then((result) => {
//             const finalList = result.map( (device) => {
//                 return device.Device;
//             })
//             finalList.push("/UDP")
//             finalList.push("/TCP")
//             this.setState({deviceList: finalList})
//         })
//     }

//     getButton = () => {
//         if (this.state.status === 'connected') {
//             return <DisconnectButton buttonFcn={this.disconnectClick}/>
//         } else {
//             return <ConnectButton buttonFcn={this.connectClick}/>
//         }
//     }

//     render() {

//         let devices = this.state.deviceList.map( (device) => {
//             return (
//                 <option value={device} key={device}>{device}</option>
//             )
//         })
//         const button = this.getButton();

//         return(

//             <div className="connection-manager-component">
//                 <div>
//                     <select className="connection-drop-box" name="Connection" id="SerialConnectList" onClick={this.get}>
//                         {devices}
//                     </select>
//                 </div>
//                 <div>
//                     <input className="connection-drop-box" name="Baud" id="SerialBaudRate" defaultValue="udpin:127.0.0.1:4242">
                        
//                     </input>
//                 </div>
//                 {button}
//             </div>
//         )
//     }

    
// }

export default ConnectionManager;