import "./style.css";
import ClientIcon from "../../assets/ClientNotActive.png";
import CloseIcon from "../../assets/close.png";
import { useState } from "react";
import api from "../../services/api";
import { getItem } from "../../utils/storage";

export default function EditClientModal({ setOpenModalEditClient, clientId, currentClient, renderCustomer, setRenderCustomer }) {

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const token = getItem("token");

  const [editClientData, setEditClientData] = useState(currentClient);

  function updateInputsEditField(key, value) {
    setEditClientData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setNameError(false);
      setEmailError("");
      setCpfError(false);
      setPhoneError(false);

      if (!editClientData.name) {
        setNameError(true);
        return
      }

      if (!editClientData.email) {
        setEmailError("O campo E-mail deve ser preenchido");
        return;
      }

      if (!editClientData.email.includes("@") || !editClientData.email.includes(".com") || editClientData.email.indexOf("@") === editClientData.email.length - 1) {
        setEmailError('O campo "email" deve ser um email válido');
        return;
      }

      if (!editClientData.cpf) {
        setCpfError(true);
        return;
      }

      if (!editClientData.phone) {
        setPhoneError(true);
        return
      }

      await api.put(`/customer/${clientId}`,
        {
          name: editClientData.name,
          email: editClientData.email,
          cpf: editClientData.cpf,
          phone: editClientData.phone,
          cep: editClientData.cep,
          street: editClientData.street,
          neighborhood: editClientData.neighborhood,
          complement: editClientData.complement,
          city: editClientData.city,
          country_state: editClientData.country_state
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      setOpenModalEditClient(false);

      setRenderCustomer(!renderCustomer);
    } catch (error) {
      return error.message;
    }
  }

  return (
    <div className="edit-client-modal-container">
      <div className="content-modal-edit-client-container">
        <div className="modal-edit-header">
          <div className="title-modal-edit-container">
            <img src={ClientIcon} className="img-title-modal" />
            <h1 className="title-modal-text">Editar Cliente</h1>
          </div>
          <img src={CloseIcon} className="close-modal" onClick={() => { setOpenModalEditClient(false) }} />
        </div>
        <div className="inputs-container">
          <label htmlFor="name" className="lable-input-modal">Nome*</label>
          <input
            type="text"
            name="name"
            className="big-input"
            placeholder="Digite o seu nome"
            value={editClientData.name}
            onChange={(e) => { updateInputsEditField("name", e.target.value) }}
          />
          {nameError &&
            <p className="error-modal-message">Este campo deve ser preenchido</p>
          }
          <label htmlFor="email" className="lable-input-modal">E-mail*</label>
          <input
            type="text"
            name="email"
            className="big-input"
            placeholder="Digite o seu e-mail"
            value={editClientData.email}
            disabled
          />
          {emailError &&
            <p className="error-modal-message">{emailError}</p>
          }
          <div className="input-horizontal-container">
            <div className="small-input-container">
              <label className="lable-input-modal" htmlFor="cpf">CPF*</label>
              <input
                type="number"
                name="cpf"
                className="md-input"
                placeholder="Digite o CPF"
                value={editClientData.cpf}
                disabled
              />
              {cpfError &&
                <p className="error-modal-message">Este campo deve ser preenchido</p>
              }
            </div>
            <div className="small-input-container">
              <label htmlFor="phone" className="label-input-modal">Telefone*</label>
              <input
                type="number"
                name="phone"
                className="small-input"
                placeholder="Digite o telefone"
                value={editClientData.phone}
                onChange={(e) => { updateInputsEditField("phone", e.target.value) }}
              />
              {phoneError &&
                <p className="error-modal-message">Este campo deve ser preenchido</p>
              }
            </div>
          </div>
          <label htmlFor="street" className="label-input-modal">Endereço</label>
          <input
            type="text"
            name="street"
            className="big-input"
            placeholder="Digite o seu endereço"
            value={editClientData.street}
            onChange={(e) => { updateInputsEditField("street", e.target.value) }}
          />
          <label htmlFor="complement" className="label-input-modal">Complemento</label>
          <input
            type="text"
            name="complement"
            className="big-input"
            placeholder="Digite o complemento"
            value={editClientData.complement}
            onChange={(e) => { updateInputsEditField("complement", e.target.value) }}
          />
          <div className="input-horizontal-container">
            <div className="small-input-container">
              <label className="label-input-modal" htmlFor="cep">CEP</label>
              <input
                type="text"
                name="cep"
                className="md-input"
                placeholder="Digite o CEP"
                value={editClientData.cep}
                onChange={(e) => { updateInputsEditField("cep", e.target.value) }}
              />
            </div>
            <div className="small-input-container">
              <label htmlFor="neighborhood" className="label-input-modal">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                className="small-input"
                placeholder="Digite o bairro"
                value={editClientData.neighborhood}
                onChange={(e) => { updateInputsEditField("neighborhood", e.target.value) }}
              />
            </div>
          </div>
          <div className="input-horizontal-container">
            <div className="small-input-container">
              <label className="label-input-modal" htmlFor="city">Cidade</label>
              <input
                type="text"
                name="city"
                className="md-md-input"
                placeholder="Digite a cidade"
                value={editClientData.city}
                onChange={(e) => { updateInputsEditField("city", e.target.value) }}
              />
            </div>
            <div className="small-input-container">
              <label htmlFor="country_state" className="label-input-modal">UF</label>
              <input
                type="text"
                name="country_state"
                className="xs-input"
                placeholder="Digite a UF"
                value={editClientData.country_state}
                onChange={(e) => { updateInputsEditField("country_state", e.target.value) }}
              />
            </div>
          </div>

        </div>
        <div className="modal-btns-containers">
          <button className="cancel-btn" onClick={() => { setOpenModalEditClient(false) }}>Cancelar</button>
          <button type="submit" className="apply-btn" onClick={handleSubmit}>Aplicar</button>
        </div>
      </div>
    </div>

  )
}