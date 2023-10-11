import React, { useState, useContext } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import droneIcon from '../resources/images/Simple_drone_small.svg';
import pinIcon from '../resources/images/DroppedPin.svg';
import '../styles/Map.css';
import { LocationContext } from '../App'

//Converted to Functional Component

const MapContainer = (props) => {
  const locationStore = useContext(LocationContext);

  const [center, setCenter] = useState({ lat: 40.84667, lng: -96.471667 });
  const [pin, setPin] = useState({ pinLat: 40.847, pinLng: -96.471667 });

  const updatePinLocation = (newLat, newLng) => {
    setPin({ pinLat: newLat, pinLng: newLng });
    locationStore.setLocation(newLat, newLng)
  };

  const mapStyles = {
    height: '92vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 40.84667,
    lng: -96.471667,
  };

  const agentMarkers = props.agents.map((currentAgent) => (
    <MarkerF
      key={currentAgent.agentId}
      label={currentAgent.agentId}
      icon={droneIcon}
      position={{ lat: currentAgent.latitude, lng: currentAgent.longitude }}
    />
  ));

  const debugDrone = (
    <MarkerF
      label="2"
      icon={droneIcon}
      position={{ lat: 40.847, lng: -96.471667 }}
    />
  );

  const { pinLat, pinLng } = pin;

  const locationPin = (
    <MarkerF
      position={{ lat: pinLat, lng: pinLng }}
      onClick={(ev) => {
        fetch(`http://127.0.0.1:8080/goto/${pinLat}/${pinLng}/10`);
        console.log('Sending to: ', pinLat, pinLng);
      }}
    />
  );

    return (
      <LoadScript googleMapsApiKey="AIzaSyBRiYN7lAj3e95teCCoKSSCYHrVAKxmobE">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={center}
          mapTypeId="satellite"
          onClick={(ev) => {
            fetch(
              `http://127.0.0.1:8080/debug_vector/C1$9/${ev.latLng.lat()}/${ev.latLng.lng()}/0`
            );
            console.log('latitide = ', ev.latLng.lat());
            console.log('longitude = ', ev.latLng.lng());
            updatePinLocation(ev.latLng.lat(), ev.latLng.lng());
            fetch('http://127.0.0.1:8080/debug_vector/C1$4/');
          }}
        >
          {agentMarkers}
          {locationPin}
          {debugDrone}
        </GoogleMap>
      </LoadScript>
    );
};

export default MapContainer;
