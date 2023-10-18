import "./style.css";
import DeleteAlert from "../../assets/delete-modal.svg";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import useCharge from "../../hooks/useCharge";


export default function DeleteModal({ setOpenDeleteModal, setDeleteError, deleteChargeData, setSucessDeleteCharge, renderCustomer, setRenderCustomer }) {
  const token = getItem("token");

  const { renderCharge, setRenderCharge } = useCharge();

  async function deleteCharge() {
    try {
      setDeleteError(false);

      if (deleteChargeData[0].status !== "Pendente") {
        setOpenDeleteModal(false)
        return setDeleteError(true)
      }
      const response = await api.delete(`/charges/${deleteChargeData[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setOpenDeleteModal(false);
      setSucessDeleteCharge(true);
      setRenderCharge(!renderCharge);
      setRenderCustomer(!renderCustomer);

    } catch (error) {
      return error.message;
    }
  }


  return (
    <div className="delete-charges-modal-container">
      <div className="content-modal-delete-container">
        <img
          src={DeleteAlert}
          className="delete-alert-image"
        />
        <p className="text-delete-modal">Tem certeza que deseja excluir esta cobrança?</p>
        <div className="buttons-container-delete-modal">
          <button
            className="cancel-delete-button"
            onClick={() => {
              setOpenDeleteModal(false)
            }}
          >Não</button>
          <button
            className="confirm-delete-button"
            onClick={deleteCharge}
          >Sim</button>
        </div>
      </div>
    </div>
  )
}