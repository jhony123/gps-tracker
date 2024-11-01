import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  LastKnownLocationsResponse,
  getLastKnownLocations,
} from "../../api/location";
import "leaflet/dist/leaflet.css";
import "./MainDashboard.css";

export const MainDashboard = () => {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<LastKnownLocationsResponse[]>([]);

  useEffect(() => {
    getLastKnownLocations({ lastNumber: 100, boardId: 1 })
      .then((res) => {
        setLocations(res.data);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <MapContainer
        center={[
          parseFloat(locations[0].gpsLatitude),
          parseFloat(locations[0].gpsLongitude),
        ]}
        zoom={18}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => {
          const speedKmph = 1.852 * parseFloat(location.speed);
          return (
            <Marker
              key={location.id}
              position={[
                parseFloat(location.gpsLatitude),
                parseFloat(location.gpsLongitude),
              ]}
            >
              <Popup>
                {location.gpsTime} <br /> Speed: {speedKmph.toFixed(2)} km/h
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
