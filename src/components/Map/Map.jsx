import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";

function Map({ center }) {
  const [markers, setMarkers] = useState([]);

  function handleMapClick(event) {
    const newMarkers = [...markers, { lat: event.lat, lng: event.lng }];
    setMarkers(newMarkers);
  }

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyC4ngNiUwpJD6dPuSpGql5KszTMt2-5szk",
        }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={8}
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            lat={marker.lat}
            lng={marker.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

function Marker() {
  return (
    <div className="marker">
      <i className="fas fa-map-marker-alt"></i>
    </div>
  );
}

export default Map;
