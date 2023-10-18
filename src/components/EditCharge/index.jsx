import "./style.css";
import paperIcon from "../../assets/paper.svg";
import closeIcon from "../../assets/close.png";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import useCharge from "../../hooks/useCharge";
import api from "../../services/api";
import { getItem } from "../../utils/storage";

export default function EditCharge() {
  const { setOpenEditCharge, setOpenSuccessPopUp } = useModal();

  const token = getItem("token");

  const { renderCharge, setRenderCharge, chargeSelected } = useCharge();

  const [newCharge, setNewCharge] = useState({
    id_charge: chargeSelected.id_charge,
    customer_name: chargeSelected.customer_name,
    description: chargeSelected.description,
    due_date: new Date(chargeSelected.due_date).toLocaleDateString("en-CA", { timeZone: "UTC" }),
    charge_value: chargeSelected.charge_value,
    status: chargeSelected.status
  });

  const [descriptionError, setDescriptionError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [valueError, setValueError] = useState("");

  function handleChangeNewCharge(e) {
    setNewCharge({ ...newCharge, [e.target.name]: e.target.value });
  }

  async function handleUpdateCharge(e) {
    e.preventDefault();

    setDescriptionError("");
    setDueDateError("");
    setValueError("");

    if (!newCharge.description) {
      setDescriptionError("Este campo deve ser preenchido");
      return;
    }

    if (!newCharge.due_date) {
      setDueDateError("Este campo deve ser preenchido");
      return;
    }

    if (newCharge.charge_value <= 0) {
      setValueError("Este campo deve ser preenchido");
      return;
    }

    await api.put(`/charges/${newCharge.id_charge}`, 
      {
        description: newCharge.description,
        charge_value: newCharge.charge_value,
        due_date: newCharge.due_date,
        status: newCharge.status
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    setRenderCharge(!renderCharge);

    setOpenEditCharge(false);

    setOpenSuccessPopUp(true);
  }

  return (
    <div className="modal">
      <div className="edit-charge-content">
        <img 
          className="close-icon" 
          src={closeIcon} 
          alt="Fechar modal de editar cobrança" 
          onClick={() => setOpenEditCharge(false)} 
        />
        <header>
          <img src={paperIcon} alt="Ícone de uma folha de papel" />
          <h1>Edição de Cobrança</h1>
        </header>
        <form onSubmit={handleUpdateCharge}>
          <div className="form-group-edit-charge">
            <label htmlFor="name">Nome<sup>*</sup></label>
            <input 
              type="text" 
              name="name" 
              value={newCharge.customer_name}
              id="name" 
              placeholder="Digite o nome"
              disabled
            />
          </div>
          <div className="form-group-edit-charge">
            <label htmlFor="description">Descrição<sup>*</sup></label>
            <textarea 
              name="description" 
              value={newCharge.description}
              onChange={handleChangeNewCharge}
              id="description" 
              placeholder="Digite a descrição"
            ></textarea>
            <span className="error-message">{descriptionError ? descriptionError : ""}</span>
          </div>
          <div className="form-group-edit-charge-details">
            <div className="charge-due-date">
              <label htmlFor="due-date">Vencimento<sup>*</sup></label>
              <input 
                type="date" 
                name="due_date" 
                value={newCharge.due_date}
                onChange={handleChangeNewCharge}
                id="due-date" 
                placeholder="Data de Vencimento"
              />
              <span className="error-message">{dueDateError ? dueDateError : ""}</span>
            </div>
            <div className="charge-value">
              <label htmlFor="charge-value">Valor<sup>*</sup></label>
              <input 
                type="number" 
                name="charge_value" 
                value={newCharge.charge_value}
                onChange={handleChangeNewCharge}
                id="charge_value" 
                placeholder="Digite o valor"
              />
              <span className="error-message">{valueError ? valueError : ""}</span>
            </div>
          </div>
          <div className="form-group-edit-charge-status">
            <label>Status<sup>*</sup></label>
            <div className="charge-paid">
              <input 
                className="input-paid"
                type="radio" 
                name="status" 
                value="Pago"
                onChange={handleChangeNewCharge}
                checked={newCharge.status === "Pago" ? true : false}
              />
              <span>Cobrança Paga</span>
            </div>
            <div className="charge-pending">
              <input 
                className="input-pending"
                type="radio" 
                name="status" 
                value="Pendente"
                onChange={handleChangeNewCharge}
                checked={newCharge.status === "Pendente" || newCharge.status === "Vencida" ? true : false}
              />
              <span>Cobrança Pendente</span>
            </div>
          </div>
          <div className="charge-edit-buttons">
            <button 
              type="button"
              className="cancel-charges-btn" 
              onClick={() => setOpenEditCharge(false)} 
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="apply-charges-btn"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}