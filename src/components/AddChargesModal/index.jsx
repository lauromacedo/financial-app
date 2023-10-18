import "./style.css"
import Charges from "../../assets/ChargesNotActive.png";
import CloseIcon from "../../assets/close.png";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/storage";
import api from "../../services/api";
import useCharge from "../../hooks/useCharge";
import useModal from "../../hooks/useModal";

export default function AddChargesModal({ clientId, clientName, renderCustomer, setRenderCustomer, setOpenPopupSucess }) {
  const token = getItem("token");

  const { setOpenAddChargesModal } = useModal();

  const { renderCharge, setRenderCharge } = useCharge();

  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const chargesTemplate = {
    description: "",
    due_date: "",
    charge_value: "",
    status: ""
  }

  const [chargesClientData, setChargesClientData] = useState(chargesTemplate);

  function updateInputsField(key, value) {
    setChargesClientData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  useEffect(() => {}, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setDescriptionError(false);
      setDateError(false);
      setValueError(false);
      setStatusError(false);

      if (!chargesClientData.description) {
        setDescriptionError(true);
        return;
      }

      if (!chargesClientData.due_date) {
        setDateError(true);
        return;
      }

      if (!chargesClientData.charge_value) {
        setValueError(true);
        return;
      }

      if (!chargesClientData.status) {
        setStatusError(true);
        return;
      }

      await api.post("/charges",
        {
          id_customer: clientId,
          description: chargesClientData.description,
          due_date: chargesClientData.due_date,
          charge_value: chargesClientData.charge_value,
          status: chargesClientData.status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      
      setRenderCharge(!renderCharge);
      
      setRenderCustomer(!renderCustomer);
    
      setOpenAddChargesModal(false);
      
      setOpenPopupSucess(true);
    } catch (error) {
      return error.message;
    }
  }

  return (
    <div className="add-charges-modal-container">
      <div className="content-modal-charges-container">
        <div className="modal-header" >
          <div className="title-modal-container" >
            <img className="img-title-modal" src={Charges} />
            <h1 className="title-modal-text">Cadastro de Cobrança</h1>
          </div>
          <img className="close-modal" src={CloseIcon} onClick={() => setOpenAddChargesModal(false)} />
        </div>
        <div className="inputs-container">
          <label htmlFor="name" className="label-input-modal">Nome*</label>
          <input
            type="text"
            name="name"
            className="big-input"
            value={clientName}
            disabled
          />


          <label htmlFor="description" className="label-input-modal">Descrição*</label>
          <textarea
            type="text"
            name="description"
            className="xl-input"
            placeholder="Digite a descrição"
            value={chargesClientData.description}
            onChange={(e) => { updateInputsField("description", e.target.value) }}
          />
          {
            descriptionError &&
            <p className="error-modal-message">Este campo deve ser preenchido</p>
          }


          <div className="input-horizontal-container">
            <div className="small-input-container">
              <label className="label-input-modal" htmlFor="date">Vencimento*</label>
              <input
                type="date"
                name="date"
                className="md-input"
                value={chargesClientData.due_date}
                onChange={(e) => { updateInputsField("due_date", e.target.value) }}
              />
              {
                dateError &&
                <p className="error-modal-message">Este campo deve ser preenchido</p>
              }
            </div>
            <div className="small-input-container">
              <label htmlFor="value" className="label-input-modal">Valor*</label>
              <input
                type="number"
                name="value"
                className="md-input"
                placeholder="Digite o valor"
                value={chargesClientData.charge_value}
                onChange={(e) => { updateInputsField("charge_value", e.target.value) }}
              />
              {
                valueError &&
                <p className="error-modal-message">Este campo deve ser preenchido</p>
              }
            </div>
          </div>
          <label className="radio-label">Status*</label>
          <div className="radio-main-container">
            <div className="radio-container">
              <input
                className="paid"
                type="radio"
                value="Pago"
                name="status"
                onChange={(e) => { updateInputsField("status", e.target.value) }}
              />
              <span className="text-radio-btn">Cobrança Paga</span>
            </div>
            <div className="radio-container">
              <input
                className="pending"
                type="radio"
                value="Pendente"
                name="status"
                onChange={(e) => { updateInputsField("status", e.target.value) }}

              />
              <span className="text-radio-btn">Cobrança Pendente</span>
            </div>
            {
              statusError &&
              <p className="error-modal-message">Este campo deve ser preenchido</p>
            }
          </div>
        </div>
        <div className="charges-btns-containers">
          <button className="cancel-charges-btn" onClick={() => setOpenAddChargesModal(false)}>Cancelar</button>
          <button type="submit" className="apply-charges-btn" onClick={handleSubmit}>Aplicar</button>
        </div>
      </div>
    </div>

  )
}