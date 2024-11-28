import React from "react";
import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
  const { handleModalEliminarColaborador } = useProyectos();

  const { nombre, email } = colaborador;

  return (
    <div className="border-b bg-white mb-3 rounded-md p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl ">
          <span className="font-semibold">Nombre: </span>
          {nombre}
        </p>
        <p className="mb-1 text-sm text-gray-700 ">
          <span className="font-semibold uppercase">Email: </span>
          {email}
        </p>
      </div>
      <button
        type="button"
        onClick={() => handleModalEliminarColaborador(colaborador)}
        className="bg-red-600 hover:bg-red-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
      >
        Eliminar
      </button>
    </div>
  );
};

export default Colaborador;
