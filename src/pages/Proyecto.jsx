import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalELiminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from "../components/Tarea";
import Colaborador from "../components/Colaborador";

import io from "socket.io-client";

let socket;

const Proyecto = () => {
  const params = useParams();

  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    submitTareasProyecto,
    editarTareaProyecto,
    cambiarEstadoTarea,
    eliminarTareaProyecto,
  } = useProyectos();
  const admin = useAdmin();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", params.id);
  }, []);

  useEffect(() => {
    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva);
      }
    });
    socket.on("tarea editada", (tareaEditada) => {
      if (tareaEditada.proyecto._id === proyecto._id) {
        editarTareaProyecto(tareaEditada);
      }
    });
    socket.on("nuevo estado", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(tareaActualizada);
      }
    });
    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada);
      }
    });
  });

  const { nombre } = proyecto;

  if (cargando) return "Cargando...";

  const { msg } = alerta;

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-between">
          <h1 className="font-black text-4xl">{nombre}</h1>
          {admin && (
            <div className="flex items-center gap-2 hover:bg-slate-200 rounded-md py-1 px-2 text-gray-400 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 font-semibold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              <Link
                to={`/proyectos/editar/${params.id}`}
                className="font-bold uppercase"
              >
                Editar
              </Link>
            </div>
          )}
        </div>

        {admin && (
          <button
            className="flex items-center justify-center gap-2 min-w-44 text-sm px-5 my-2 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-700 text-white text-center "
            onClick={handleModalTarea}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Nueva tarea
          </button>
        )}
        <p className="font-bold text-xl mt-10 ">Tareas del Proyecto</p>

        <div className="mt-5 p-3 rounded-lg">
          {proyecto.tareas?.length ? (
            proyecto.tareas?.map((tarea) => (
              <Tarea key={tarea._id} tarea={tarea} />
            ))
          ) : (
            <p className="text-center my-5 p-10 font-bold bg-white rounded-md shadow-md">
              No hay tareas que mostrar
            </p>
          )}
        </div>

        {admin && (
          <>
            <div className="flex items-center justify-between mr-2 mt-5">
              <p className="font-bold text-xl">Colaboradores</p>
              <Link
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className="text-gray-400 hover:text-black uppercase font-bold"
              >
                Añadir
              </Link>
            </div>
            <div className="mt-5 p-3 rounded-lg">
              {proyecto.colaboradores?.length ? (
                proyecto.colaboradores?.map((colaborador) => (
                  <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                  />
                ))
              ) : (
                <p className="text-center my-5 p-10 font-bold bg-white rounded-md shadow-md">
                  No hay colaboradores en este proyecto.
                </p>
              )}
            </div>
          </>
        )}

        <ModalFormularioTarea />
        <ModalEliminarTarea />
        <ModalEliminarColaborador />
      </div>
    </>
  );
};

export default Proyecto;
