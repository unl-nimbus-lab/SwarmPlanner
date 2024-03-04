import React from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import droneIcon from '../../resources/images/Simple_drone_small.svg'

class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            center: { lat: 40.84667, lng: -96.471667},
            cluster: 1
        }
    }

    handleIncrement = () => {
        this.setState({cluster: this.state.cluster + 1})
    }

    handleDecrement = () => {
        this.setState({cluster: this.state.cluster - 1})
    }

  render() {
    const mapStyles = {        
        height: "92vh",
        width: "100%"};
      
      const defaultCenter = {
        lat: 40.84667, lng: -96.471667
      }

      const agentMarkers = this.props.agents.map( (currentAgent) => {
        return(
            <MarkerF label={currentAgent.agentId} icon={droneIcon} position={ {lat: currentAgent.latitude, lng: currentAgent.longitude} }/>
        )
      })

      const debug = <MarkerF label={'2'} icon={droneIcon} position={ {lat: 40.847, lng: -96.471667} }/>

    return (
        <div>
          <div>
            Cluster to Move: 
            <input type="number" value={this.state.cluster} readOnly />
            <button onClick={this.handleIncrement}>+</button>
            <button onClick={this.handleDecrement}>-</button>
          </div>


        <LoadScript
        googleMapsApiKey='AIzaSyBRiYN7lAj3e95teCCoKSSCYHrVAKxmobE'>
            <GoogleMap 
                    mapContainerStyle={mapStyles} 
                    zoom={18} 
                    center={this.state.center} 
                    mapTypeId='satellite'
                    onRightClick={ev => {
                      fetch('http://127.0.0.1:8080/debug_vector/C' + this.state.cluster +'$1/' + (ev.latLng.lat() + '/') + (ev.latLng.lng() + '/') + "0" );
                            console.log("latitide = ", ev.latLng.lat());
                            console.log("longitude = ", ev.latLng.lng());
                            this.setState({ center: {lat: ev.latlng.lat() ,lng:ev.latlng.lng() } })
                            fetch('http://127.0.0.1:8080/debug_vector/C1$4/' + '')
                        }}
                    >
            {agentMarkers}
            </GoogleMap>
        </LoadScript>
        </div>
    )
  }

}

export default MapContainer;