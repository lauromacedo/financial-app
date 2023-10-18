import "./style.css";
import Client from "../../assets/ClientNotActive.png";
import CloseIcon from "../../assets/close.png";
import { useState } from "react";
import api from "../../services/api";
import { getItem } from "./../../utils/storage";


export default function ClientsModal({ setOpenAddClientModal, renderCustomer, setRenderCustomer }) {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const token = getItem("token");

  const clientTemplate = {
    name: "",
    email: "",
    cpf: "",
    phone: "",
    street: "",
    complement: "",
    cep: "",
    neighborhood: "",
    city: "",
    country_state: ""
  }

  const [clientData, setClientData] = useState(clientTemplate);

  function updateInputsField(key, value) {
    setClientData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  async function handleModalSubmit(e) {
    e.preventDefault();

    try {
      setNameError(false);
      setEmailError("");
      setCpfError(false);
      setPhoneError(false);

      if (!clientData.name) {
        setNameError(true);
        return
      }

      if (!clientData.email) {
        setEmailError("O campo E-mail deve ser preenchido");
        return;
      }

      if (!clientData.email.includes("@") || !clientData.email.includes(".com") || clientData.email.indexOf("@") === clientData.email.length - 1) {
        setEmailError('O campo "email" deve ser um email válido');
        return;
      }

      if (!clientData.cpf) {
        setCpfError(true);
        return;
      }

      if (!clientData.phone) {
        setPhoneError(true);
        return
      }

      await api.post("/customer",
        {
          ...clientData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      setRenderCustomer(!renderCustomer);

      setOpenAddClientModal(false);
    } catch (error) {
      return error.message;
    }
  }

  return (
    <div className="add-modal-container">
      <div className="content-modal-clients-container">
        <div className="modal-header" >
          <div className="title-modal-container" >
            <img className="img-title-modal" src={Client} />
            <h1 className="title-modal-text">Cadastro do Cliente</h1>
          </div>
          <img className="close-modal" src={CloseIcon} onClick={() => setOpenAddClientModal(false)} />
        </div>
        <div className="inputs-container">
          <label htmlFor="name" className="lable-input-modal">Nome*</label>
          <input
            type="text"
            name="name"
            className="big-input"
            placeholder="Digite o seu nome"
            value={clientData.name || ""}
            onChange={(e) => { updateInputsField("name", e.target.value) }}
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
            value={clientData.email || ""}
            onChange={(e) => { updateInputsField("email", e.target.value) }}
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
                value={clientData.cpf || ""}
                onChange={(e) => { updateInputsField("cpf", e.target.value) }}
              />
              {cpfError &&
                <p className="error-modal-message">Este campo deve ser preenchido</p>
              }
            </div>
            <div className="small-input-container">
              <label htmlFor="phone" className="lable-input-modal">Telefone*</label>
              <input
                type="number"
                name="phone"
                className="small-input"
                placeholder="Digite o telefone"
                value={clientData.phone || ""}
                onChange={(e) => { updateInputsField("phone", e.target.value) }}
              />
              {phoneError &&
                <p className="error-modal-message">Este campo deve ser preenchido</p>
              }
            </div>
          </div>
          <label htmlFor="street" className="lable-input-modal">Endereço</label>
          <input
            type="text"
            name="street"
            className="big-input"
            placeholder="Digite o seu endereço"
            value={clientData.street || ""}
            onChange={(e) => { updateInputsField("street", e.target.value) }}
          />
          <label htmlFor="complement" className="lable-input-modal">Complemento</label>
          <input
            type="text"
            name="complement"
            className="big-input"
            placeholder="Digite o complemento"
            value={clientData.complement || ""}
            onChange={(e) => { updateInputsField("complement", e.target.value) }}
          />
          <div className="input-horizontal-container">
            <div className="small-input-container">
              <label className="lable-input-modal" htmlFor="cep">CEP</label>
              <input
                type="text"
                name="cep"
                className="md-input"
                placeholder="Digite o CEP"
                value={clientData.cep || ""}
                onChange={(e) => { updateInputsField("cep", e.target.value) }}
              />
            </div>
            <div className="small-input-container">
              <label htmlFor="neighborhood" className="lable-input-modal">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                className="small-input"
                placeholder="Digite o bairro"
                value={clientData.neighborhood || ""}
                onChange={(e) => { updateInputsField("neighborhood", e.target.value) }}
              />
            </div>
          </div>
          <div className="input-horizontal-container">
            <div className="small-input-container">
              <label className="lable-input-modal" htmlFor="city">Cidade</label>
              <input
                type="text"
                name="city"
                className="md-md-input"
                placeholder="Digite a cidade"
                value={clientData.city || ""}
                onChange={(e) => { updateInputsField("city", e.target.value) }}
              />
            </div>
            <div className="small-input-container">
              <label htmlFor="country_state" className="lable-input-modal">UF</label>
              <input
                type="text"
                name="country_state"
                className="xs-input"
                placeholder="Digite a UF"
                value={clientData.country_state || ""}
                onChange={(e) => { updateInputsField("country_state", e.target.value) }}
              />
            </div>
          </div>

        </div>
        <div className="modal-btns-containers">
          <button className="cancel-btn" onClick={() => setOpenAddClientModal(false)}>Cancelar</button>
          <button type="submit" className="apply-btn" onClick={handleModalSubmit}>Aplicar</button>
        </div>
      </div>
    </div>
  )
}