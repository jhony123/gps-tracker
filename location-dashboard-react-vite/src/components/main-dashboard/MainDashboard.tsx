import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Flatpickr from "react-flatpickr";

import { LocationsMap } from "../common/locations-map/LocationsMap";

import { LocationsResponse, getLocations } from "../../api/location";

import { strings } from "../common/constants/strings.tsx";

import "./MainDashboard.scss";

export const MainDashboard = () => {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<LocationsResponse[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    getLocations({
      boardId: 1,
      startDate: startDate,
      endDate: endDate,
    })
      .then((res) => {
        setLocations(res.data);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [startDate, endDate]);

  // useEffect(() => {
  //   getLastKnownLocations({ lastNumber: 50, boardId: 1 })
  //     .then((res) => {
  //       setLocations(res.data);
  //     })
  //     .catch(() => {
  //       logout();
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  if (isLoading) {
    return (
      <Row className="justify-content-md-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  return (
    <>
      <Row className="justify-content-md-center mt-2 mb-2">
        <Form.Group as={Col} md="4" controlId="validationFormikUsername">
          <Form.Label>{strings.startTime}</Form.Label>
          <InputGroup hasValidation>
            <Flatpickr
              data-enable-time
              value={startDate}
              onChange={([date]: [date: Date]) => {
                setStartDate(date);
              }}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormikUsername">
          <Form.Label>{strings.endTime}</Form.Label>
          <InputGroup hasValidation>
            <Flatpickr
              data-enable-time
              value={endDate}
              onChange={([date]: [date: Date]) => {
                setEndDate(date);
              }}
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Row>
        <Col>
          {locations.length ? (
            <LocationsMap locations={locations} />
          ) : (
            <span>No locations found</span>
          )}
        </Col>
      </Row>
    </>
  );
};
