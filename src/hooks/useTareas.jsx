import { useContext } from "react";
import TareaContext from "../context/TareaProvider";

const useTareas = () => {
  return useContext(TareaContext);
};

export default useTareas;
