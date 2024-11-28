import React, { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/Alerta";
import IconoLupa from "../assets/loupe.png";


const Proyectos = () => {
  const { proyectos, cargando, alerta } = useProyectos();

  

  // useEffect(() => {
  //   obtenerProyectos();
  // }, []);

  // if (cargando) return "Cargando.....";

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      {msg && <Alerta alerta={alerta} />}

      <div className=" mt-10 rounded-lg py-2">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="bg-white shadow mt-3 text-center text-gray-600 uppercase p-5 ">
            No hay proyectos{" "}
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
