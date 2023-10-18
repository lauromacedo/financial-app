import { useState } from "react";


export default function useCreateModalValues() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openEditCharge, setOpenEditCharge] = useState(false);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [openAddChargesModal, setOpenAddChargesModal] = useState(false);

  return {
    openEditModal,
    setOpenEditModal,
    openPopUp,
    setOpenPopUp,
    openEditCharge,
    setOpenEditCharge,
    openSuccessPopUp,
    setOpenSuccessPopUp,
    openAddChargesModal,
    setOpenAddChargesModal
  };
}