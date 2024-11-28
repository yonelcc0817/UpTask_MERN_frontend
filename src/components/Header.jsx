import React from "react";
import IconoBuscar from "../assets/loupe.png";
import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Busqueda from "./Busqueda";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();
  const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionProyectos();
    cerrarSesionAuth();
    sessionStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-2  ">
          <div
            className="flex hover:bg-gray-200 py-2 px-3 rounded-md"
            onClick={handleBuscador}
          >
            <img src={IconoBuscar} alt="Buscar" className="w-6 h-6" />

            <button type="button" className="font-bold uppercase ">
              Buscar
            </button>
          </div>

          <Link
            to="/proyectos"
            className="font-bold uppercase hover:bg-gray-200 py-2 px-3 rounded-md"
          >
            Proyectos
          </Link>
          <button
            type="button"
            className="text-white hover:bg-sky-900 text-sm bg-sky-600 rounded-md p-3 uppercase font-bold"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
