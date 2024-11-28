import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";

const PRIORIDAD = ["Baja", "Media", "Alta"];
const ModalFormularioTarea = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [prioridad, setPrioridad] = useState("");

  const params = useParams();
  const {
    modalFormularioTarea,
    handleModalTarea,
    mostrarAlerta,
    alerta,
    submitTarea,
    tarea,
  } = useProyectos();

  useEffect(() => {
    if (tarea?._id) {
      setId(tarea._id);
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setFechaEntrega(tarea.fechaEntrega?.split("T")[0]);
      setPrioridad(tarea.prioridad);
      return;
    }
    setId("");
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setPrioridad("");
  }, [tarea]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, prioridad, fechaEntrega].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    await submitTarea({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      prioridad,
      proyecto: params.id,
    });

    setId("");
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setPrioridad("");
  };

  const { msg } = alerta;

  return (
    <>
      <Dialog
        open={modalFormularioTarea}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleModalTarea}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white shadow-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500"
                  onClick={handleModalTarea}
                >
                  <span className="sr-only"> Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    {id ? "Editar Tarea" : "Crear Tarea"}
                  </Dialog.Title>
                  {msg && <Alerta alerta={alerta} />}
                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la tarea"
                        className="border w-full p-2 mt-2 plah=ceholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Descripcion
                      </label>
                      <textarea
                        id="descripcion"
                        placeholder="Descripcion de la tarea"
                        className="border w-full p-2 mt-2 plah=ceholder-gray-400 rounded-md"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="fechaEntrega"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Fecha de entrega
                      </label>
                      <input
                        id="fechaEntrega"
                        type="date"
                        className="border w-full p-2 mt-2 plahceholder-gray-400 rounded-md"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="prioridad"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Prioridad
                      </label>
                      <select
                        type="text"
                        id="prioridad"
                        className="border w-full p-2 mt-2 plah=ceholder-gray-400 rounded-md"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="">--Seleccione--</option>
                        {PRIORIDAD.map((opc) => (
                          <option key={opc} value={opc}>
                            {opc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
                      value={id ? "Guardar Cambios" : "Crear Tarea"}
                    />
                  </form>
                </div>
              </div>
              {/* <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Payment successful
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setModal(false)}
                >
                  Got it, thanks!
                </Button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalFormularioTarea;
