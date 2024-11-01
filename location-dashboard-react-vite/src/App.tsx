import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./AppRoutes.tsx";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
