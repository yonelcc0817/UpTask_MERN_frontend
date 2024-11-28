import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ auth }) => {
  const { nombre } = auth;
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hola: {nombre} </p>
      <Link
        to="crear-proyecto"
        className="bg-sky-600 hover:bg-sky-900 text-white block text-center rounded-lg w-full mt-5 p-3 font-bold uppercase"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
