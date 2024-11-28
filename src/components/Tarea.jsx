import React from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import ModalEliminarTarea from "./ModalELiminarTarea";
import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { nombre, descripcion, fechaEntrega, prioridad, _id, estado } = tarea;

  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();

  const admin = useAdmin();

  const navigate = useNavigate();

  return (
    <div className="border-b bg-white mb-3 rounded-md p-5 flex justify-between items-center ">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl ">
          <span className="font-semibold">Nombre: </span>
          {nombre}
        </p>
        <p className="mb-1 text-sm text-gray-500 ">
          <span className="font-semibold uppercase">Descripcion: </span>
          {descripcion}
        </p>
        <p className="mb-1 text-sms">
          <span className="font-semibold">Fecha: </span>
          {formatearFecha(fechaEntrega)}
        </p>
        <p className="mb-1 text-gray-600">
          <span className="font-semibold">Prioridad: </span> {prioridad}
        </p>
        {estado && (
          <p className="text-xs bg-green-600 uppercase p-1 px-2 rounded-md text-white font-semibold">
            Completado por : {tarea.completado.nombre}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 hover:bg-indigo-800  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          onClick={() => completarTarea(_id)}
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } hover:bg-sky-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            className="bg-red-600 hover:bg-red-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
