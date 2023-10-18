import { createContext } from "react";
import useCreateModalValues from "../hooks/useCreateModalValues";

export const ModalContext = createContext();

export function ModalProvider(props) {
  const modalValues = useCreateModalValues();

  return (
    <ModalContext.Provider value={ modalValues }>
      {props.children}
    </ModalContext.Provider>
  );
}