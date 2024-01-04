import * as React from "react";
import { createRoot } from "react-dom/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
const render = (status) => {
  return <h1>{status}</h1>;
};

const GoogleMap = () => {
    // [START maps_react_map_component_app_state]
    const [clicks, setClicks] = React.useState([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState({
      lat: 0,
      lng: 0,
    });
  
    // [START maps_react_map_component_app_return]
    return (
      <div style={{ display: "flex", height: "100%" }}>
        <Wrapper apiKey={"AIzaSyBRiYN7lAj3e95teCCoKSSCYHrVAKxmobE"} render={render}>
          <Map
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={10}
            style={{ flexGrow: "1", height: "100%" }}
          >
            {/* {clicks.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))} */}
          </Map>
        </Wrapper>
        {/* Basic form for controlling center and zoom of map. */}
        {form}
      </div>
    );
    // [END maps_react_map_component_app_return]
  };

  export default GoogleMap;