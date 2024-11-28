import React from "react";
import { Link, useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();

  const { nombre, _id, cliente, creador } = proyecto;

  const { eliminarProyecto } = useProyectos();
  const handleEliminar = async () => {
    if (confirm("Está seguro que desea eliminar este proyecto?")) {
      await eliminarProyecto(_id);
    }
    return;
  };

  return (
    <>
      <div className="bg-white border-b p-5 flex flex-col md:flex-row items-center rounded-md shadow m-2">
        <div className="flex-1 items-center gap-2 ">
          <p className="text-xl font-bold">{nombre} </p>
          <p className="text-sm text-gray-500 uppercase"> {cliente}</p>
        </div>

        <div>
          <div className="flex items-center">
            {auth._id !== creador && (
              <p className="text-xs p-1 bg-green-500 uppercase rounded-lg text-white font-semibold mx-2">
                Colaborador
              </p>
            )}
            <Link
              to={`${_id}`}
              className="text-gray-600 hover:bg-slate-200 hover:rounded-md p-2 hover:text-gray-800 uppercase text-sm font-bold"
            >
              {" "}
              Ver proyecto
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-10 w-10 m-1 rounded-md p-2  hover:bg-red-500 transition-colors"
              onClick={handleEliminar}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewProyecto;
