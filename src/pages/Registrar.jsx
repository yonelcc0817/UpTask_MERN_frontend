import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }
    if (password.length < 8) {
      setAlerta({
        msg: "La contraseña debe tener mínimo 8 caracteres",
        error: true,
      });
      return;
    }

    //Crear el ususario
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        password,
        email,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700 ">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Introduzca su Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Definir contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password1"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Confirmar
          </label>
          <input
            id="password1"
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => {
              setRepetirPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="w-full mb-5 bg-blue-600 rounded py-3 uppercase text-white font-bold hover:bg-blue-900 hover:cursor-pointer transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-around">
        <Link
          className="block text-center my-5 text-slate-500  text-base hover:text-blue-400"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500  text-base hover:text-blue-400"
          to="/olvide-password"
        >
          Ovidé mi Contraseña
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
