import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsusario = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        // navigate("/proyectos");
      } catch (error) {
        setAuth({});
        console.log(error.response.data.msg);
      }
      setCargando(false);
    };
    autenticarUsusario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        cargando,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
