import React, { Component } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import droneIcon from '../resources/images/Simple_drone_small.svg';
import pinIcon from '../resources/images/DroppedPin.svg';
import '../styles/Map.css';

class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            center: { lat: 40.84667, lng: -96.471667}, pin : {pinLat: 40.847, pinLng: -96.471667}, pinLabel: "Start" 
        }
    }

    setIsHovered = (string) =>{
      this.setState({pinLabel: string})
    }

    updatePinLocation = (newLat, newLng) => {
      this.setState({
        pin: { pinLat: newLat, pinLng: newLng}
      });
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

      const debugDrone = <MarkerF label={'2'} icon={droneIcon} position={ {lat: 40.847, lng: -96.471667} }/>
      const {pinLat, pinLng} = this.state.pin;
      const locationPin = <MarkerF label={this.state.pinLabel} icon={pinIcon} position={{lat: pinLat, lng: pinLng}} onClick={ ev => {
                        fetch('http://127.0.0.1:8080/goto/' + pinLat + '/' + pinLng + '/' + 10);     //alt?   
                        console.log("Sending to: ", pinLat, pinLng)
                        }} 
                        />


    return (
        <LoadScript
        googleMapsApiKey='AIzaSyBRiYN7lAj3e95teCCoKSSCYHrVAKxmobE'>
            <GoogleMap 
                    mapContainerStyle={mapStyles} 
                    zoom={18} 
                    center={this.state.center} 
                    mapTypeId='satellite'
                    onRightClick={ev => {
                      fetch('http://127.0.0.1:8080/debug_vector/C1$9/' + (ev.latLng.lat() + '/') + (ev.latLng.lng() + '/') + "0" );
                            console.log("latitide = ", ev.latLng.lat());
                            console.log("longitude = ", ev.latLng.lng());
                            this.updatePinLocation(ev.latLng.lat(), ev.latLng.lng());
                            fetch('http://127.0.0.1:8080/debug_vector/C1$4/' + '');
                        }}
                    
                    >
            {agentMarkers}
            {locationPin}
            {debugDrone}
            </GoogleMap>
        </LoadScript>
    )
  }

}

export default MapContainer;