import axios from "axios";

const locationApi = axios.create({
  baseURL: import.meta.env.VITE_LOCATION_API_URL + "/location",
  timeout: 2000,
});

locationApi.interceptors.request.use(
  (request) => {
    const token = JSON.parse(window.localStorage.getItem("token") || "");
    if (token) {
      request.headers["Authorization"] = token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type LastKnownLocationsRequest = {
  lastNumber: number;
  boardId: number;
};

export type LocationsResponse = {
  id: number;
  gpsLongitude: string;
  gpsLatitude: string;
  gpsTime: string;
  boardId: number;
  speed: string;
  voltage: string;
};

export const getLastKnownLocations = ({
  lastNumber,
  boardId,
}: LastKnownLocationsRequest) =>
  locationApi.get<LocationsResponse[]>("/lastKnownLocations", {
    params: {
      lastNumber,
      boardId,
    },
  });
