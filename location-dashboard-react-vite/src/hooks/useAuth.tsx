import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "./useLocalStorage";

type UserData = {
  token: string;
  login: (data: string) => void;
  logout: () => void;
};

const AuthContext = createContext<UserData>({
  token: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", null);

  const login = (data: string) => {
    setToken(data);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    navigate("/");
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
