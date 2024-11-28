import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const token = useParams().token;
  // const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([password, password2].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    } else if (password.length < 8 || password2.length < 8) {
      setAlerta({
        msg: "Las contraseñas deben tener mínimo 8 caracteres",
        error: true,
      });
      return;
    } else if (password !== password2) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        { password }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setPassword("");
    setPassword2("");
  };

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
        Reestablece tu contraseña
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg p-10"
        >
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password2"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Confirmar
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Reestablecer contraseña"
            className="w-full mb-5 bg-blue-600 rounded py-3 uppercase text-white font-bold hover:bg-blue-900 hover:cursor-pointer transition-colors"
          />
        </form>
      )}
      <Link
        className="block text-center my-5 text-slate-500  text-2xl hover:text-blue-400 hover:bg-slate-200 p-3 rounded-md "
        to="/"
      >
        Inicia Sesión
      </Link>
    </>
  );
};

export default NuevoPassword;
