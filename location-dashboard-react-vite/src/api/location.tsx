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
  boardId: number;
  lastNumber: number;
};

export type LocationsResponse = {
  id: number;
  gpsLongitude: string;
  gpsLatitude: string;
  gpsTime: string;
  boardId: number;
  speed: string;
  voltage: string;
  servertime: string;
};

export const getLastKnownLocations = ({
  boardId,
  lastNumber,
}: LastKnownLocationsRequest) =>
  locationApi.get<LocationsResponse[]>("/lastKnownLocations", {
    params: {
      lastNumber,
      boardId,
    },
  });

type LocationsRequest = {
  boardId: number;
  startDate: Date;
  endDate: Date;
};

export const getLocations = ({
  boardId,
  startDate,
  endDate,
}: LocationsRequest) =>
  locationApi.get<LocationsResponse[]>("/locations", {
    params: {
      boardId,
      startDate,
      endDate,
    },
  });
