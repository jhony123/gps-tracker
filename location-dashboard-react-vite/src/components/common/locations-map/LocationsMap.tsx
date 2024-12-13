import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { LocationsResponse } from "../../../api/location";

import { strings } from "../constants/strings";

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
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => {
        // const speedKmph = 1.852 * parseFloat(location.speed);
        const serverTime = new Date(location.servertime);
        const year = serverTime.getFullYear();
        const month = serverTime.getMonth();
        const day = serverTime.getDate();
        const hours = serverTime.getHours();
        const minutes = serverTime.getMinutes();
        const seconds = serverTime.getSeconds();
        return (
          <Marker
            key={location.id}
            position={[
              parseFloat(location.gpsLatitude),
              parseFloat(location.gpsLongitude),
            ]}
          >
            <Popup>
              {strings.year}: {year}
              <br />
              {strings.month}: {month + 1}
              <br />
              {strings.day}: {day}
              <br />
              <br />
              {hours}:{minutes}:{seconds}
              {/* <br /> Speed: {speedKmph.toFixed(2)} km/h */}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
