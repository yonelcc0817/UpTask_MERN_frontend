import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

import FormularioProyecto from "../components/FormularioProyecto";

const EditarProyecto = () => {
  const { id } = useParams();
  const { proyecto, obtenerProyecto, cargando } = useProyectos();
  const [editar, setEditar] = useState(true);

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { nombre } = proyecto;

  if (cargando) return "Cargando...";

  return (
    <>
      <h1 className="font-black text-4xl">Editar Proyecto: {nombre}</h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto editar={editar} setEditar={setEditar} />
      </div>
    </>
  );
};

export default EditarProyecto;
