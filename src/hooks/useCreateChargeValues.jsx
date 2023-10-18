import { useState } from "react";


export default function useCreateChargeValues() {
  const [chargeSelected, setChargeSelected] = useState({});
  const [renderCharge, setRenderCharge] = useState(false);
  const [currentCharges, setCurrentCharges] = useState([]);
  const [currentCustomers, setCurrentCustomers] = useState([]);

  return {
    chargeSelected,
    setChargeSelected,
    renderCharge,
    setRenderCharge,
    currentCharges,
    setCurrentCharges,
    currentCustomers,
    setCurrentCustomers
  };
}