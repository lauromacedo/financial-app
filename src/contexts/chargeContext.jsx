
import { createContext } from "react";
import useCreateChargeValues from "../hooks/useCreateChargeValues";

export const ChargeContext = createContext();

export function ChargeProvider(props) {
  const chargeValues = useCreateChargeValues();

  return (
    <ChargeContext.Provider value={ chargeValues }>
      {props.children}
    </ChargeContext.Provider>
  );
}