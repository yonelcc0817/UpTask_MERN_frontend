import React, { useState } from "react";
import { Dialog, DialogPanel, Combobox } from "@headlessui/react";
import useProyectos from "../hooks/useProyectos";
import { Link } from "react-router-dom";

const Busqueda = () => {
  const [busqueda, setBusqueda] = useState("");
  const { buscador, handleBuscador, proyectos } = useProyectos();

  const proyectosFiltrados =
    busqueda === ""
      ? []
      : proyectos.filter((proyecto) =>
          proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );

  return (
    <>
      <Dialog
        open={buscador}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleBuscador}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex mt-10 justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white shadow-xl p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full h-12 border-0 bg-transparent pl-5 pr-4 text-gray-800 placeholder-gray-400 sm:text-sm rounded-md focus:ring-0"
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              {proyectosFiltrados.length > 0 && (
                <div className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                  {proyectosFiltrados.map((proyecto) => (
                    <div
                      key={proyecto._id}
                      value={proyecto}
                      className="flex cursor-default w-full rounded-md mt-2 select-none px-4 py-2 hover:bg-sky-600 hover:text-white"
                      onClick={() => {
                        handleBuscador();
                        setBusqueda("");
                      }}
                    >
                      <Link
                        to={`/proyectos/${proyecto._id}`}
                        className="flex-1"
                      >
                        {proyecto.nombre}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Busqueda;
