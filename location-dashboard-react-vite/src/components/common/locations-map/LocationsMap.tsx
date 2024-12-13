import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { LocationsResponse } from "../../../api/location";

import "leaflet/dist/leaflet.css";
import "./LocationsMap.scss";

export const LocationsMap = ({
  locations,
}: {
  locations: LocationsResponse[];
}) => {
  return (
    <MapContainer
      center={[
        parseFloat(locations[0].gpsLatitude),
        parseFloat(locations[0].gpsLongitude),
      ]}
      zoom={18}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => {
        // const speedKmph = 1.852 * parseFloat(location.speed);
        return (
          <Marker
            key={location.id}
            position={[
              parseFloat(location.gpsLatitude),
              parseFloat(location.gpsLongitude),
            ]}
          >
            <Popup>
              {location.gpsTime}
              {/* <br /> Speed: {speedKmph.toFixed(2)} km/h */}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
