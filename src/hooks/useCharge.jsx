import { useContext } from "react";
import { ChargeContext } from "../contexts/chargeContext";


export default function useCharge() {
  return useContext(ChargeContext);
}