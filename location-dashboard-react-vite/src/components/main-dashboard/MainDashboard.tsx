import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import { LocationsMap } from "../common/locations-map/LocationsMap";

import { LocationsResponse, getLastKnownLocations } from "../../api/location";

import "./MainDashboard.scss";

export const MainDashboard = () => {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<LocationsResponse[]>([]);

  useEffect(() => {
    getLastKnownLocations({ lastNumber: 50, boardId: 1 })
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
    <>
      <LocationsMap locations={locations} />
    </>
  );
};
