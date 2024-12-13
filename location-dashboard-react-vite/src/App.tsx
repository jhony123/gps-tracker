import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./AppRoutes.tsx";

import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "flatpickr/dist/themes/material_green.css";

import "./App.scss";

function App() {
  return (
    <>
      <Container fluid>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Container>
    </>
  );
}

export default App;
