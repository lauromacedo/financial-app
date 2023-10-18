import { useContext } from "react";
import { ModalContext } from "../contexts/modalContext";


export default function useModal() {
  return useContext(ModalContext);
}