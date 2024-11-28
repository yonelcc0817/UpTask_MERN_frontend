import React, { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import FormularioColaborador from "../components/FormularioColaborador";
import Alerta from "../components/Alerta";
import { useNavigate } from "react-router-dom";

const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    alerta,
    colaborador,
    agregarColaborador,
  } = useProyectos();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  // if (cargando) return "Cargando...";

  if (!proyecto?._id) return <Alerta alerta={alerta} />;

  return (
    <>
      <h1 className="font-black text-4xl ">
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}{" "}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
      <input
        type="button"
        value="Volver"
        onClick={() => {
          navigate(-1);
        }}
        className="text-gray-400 hover:text-black uppercase font-bold my-3 mx-auto w-full"
      />
      {cargando ? (
        <p className="text-center mt-3 font-semibold">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10 ">
            <div className="bg-white py-10 px-5 lg:w-1/2 rounded-lg shadow w-full">
              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>
                <button
                  type="button"
                  className="bg-slate-500 hover:bg-slate-700 text-center px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarColaborador({ email: colaborador.email })
                  }
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
