import "./style.css"
import SideBar from "../SideBar";
import DetailsHeader from "../DetailsHeader";
import Client from "../../assets/ClientNotActive.png"
import Edit from "../../assets/green-edit.svg";
import Order from "../../assets/order.svg";
import EditIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/delete.svg";
import { useState, useEffect } from "react";
import EditClientModal from "../EditClientModal";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import AddChargesModal from "../AddChargesModal";
import useModal from "../../hooks/useModal";
import EditCharge from "../EditCharge";
import useCharge from "../../hooks/useCharge";
import SuccessPopUp from "../SuccessPopUp";
import AddChargesSucess from "../AddChargesSucess";
import ChargesDetails from "../ChargesDetails";
import DeleteSucessPopup from "../../components/DeleteSucessPopup";
import DeleteModal from "../../components/DeleteModal";
import DeleteErrorPopup from "../../components/DeleteErrorPopup"

export default function ClientDetails({ setOpenDetails, openDetails, clientId, renderCustomer, setRenderCustomer }) {
  const [openModalEditClient, setOpenModalEditClient] = useState(false);
  const [currentClient, setCurrentClient] = useState({});
  const [openPopupSucess, setOpenPopupSucess] = useState(false);
  const { openEditCharge, setOpenEditCharge, openSuccessPopUp, openAddChargesModal, setOpenAddChargesModal } = useModal();
  
  const [clientName, setClientName] = useState("");
  const { setChargeSelected, renderCharge } = useCharge();
  const token = getItem("token");
  const [chargesDetailsId, setChargesDetailsId] = useState();
  const [openChargesDetailsModal, setOpenChargesDetailsModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sucessDeleteCharge, setSucessDeleteCharge] = useState(false);
  const [deleteChargeData, setDeleteChargeData] = useState();
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    async function getCustomer() {
      try {
        const response = await api.get(`/customer/detail/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setCurrentClient(response.data);

        setClientName(currentClient.name)
      } catch (error) {
        return error.message;
      }
    }

    getCustomer()
  }, [renderCustomer, renderCharge])


  return (
    <div className="clients-container">

      {
        openModalEditClient &&
        <EditClientModal
          setOpenModalEditClient={setOpenModalEditClient}
          clientId={clientId}
          currentClient={currentClient}
          renderCustomer={renderCustomer}
          setRenderCustomer={setRenderCustomer}
        />
      }

      {
        openAddChargesModal &&
        <AddChargesModal
          clientId={clientId}
          clientName={currentClient.name}
          renderCustomer={renderCustomer}
          setRenderCustomer={setRenderCustomer}
          setOpenPopupSucess={setOpenPopupSucess}
        />
      }

      {
        openChargesDetailsModal &&

        <ChargesDetails
          setOpenChargesDetailsModal={setOpenChargesDetailsModal}
          chargesDetailsId={chargesDetailsId}
        />
      }
      {
        openDeleteModal &&

        <DeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          setDeleteError={setDeleteError}
          deleteChargeData={deleteChargeData}
          setSucessDeleteCharge={setSucessDeleteCharge}
          renderCustomer={renderCustomer}
          setRenderCustomer={setRenderCustomer}
        />
      }
      {sucessDeleteCharge &&
        <DeleteSucessPopup
          setSucessDeleteCharge={setSucessDeleteCharge} />
      }
      {
        deleteError &&
        <DeleteErrorPopup
          setDeleteError={setDeleteError}
        />

      }
      <SideBar />
      <div className="content-container">

        <DetailsHeader
          setOpenDetails={setOpenDetails}
          openDetails={openDetails}
        />
        {openPopupSucess &&

          <AddChargesSucess setOpenPopupSucess={setOpenPopupSucess} />
        }

        <div className="client-details-title-container ">
          <img className="client-img-text" src={Client} />
          <h1 className="title-client">{currentClient.name}</h1>
        </div>
        <div className="client-data-container">
          <div className="client-data-header">
            <h3 className="client-text-header">Dados do cliente</h3>
            <button className="edit-client-btn"
              onClick={() => { setOpenModalEditClient(true) }}
            ><img className="edit-img" src={Edit} />Editar Cliente</button>
          </div>
          <div className="client-data-card">
            <div>
              <h3 className="client-data-title" >E-mail</h3>
              <p className="client-data-text">{currentClient.email}</p>
            </div>
            <div>
              <h3 className="client-data-title">Telefone</h3>
              <p className="client-data-text">{currentClient.phone}</p>
            </div>
            <div>
              <h3 className="client-data-title">CPF</h3>
              <p className="client-data-text">{currentClient.cpf}</p>
            </div>
          </div>
          <div className="client-address-data">
            <div>
              <h3 className="client-data-title">Endereço</h3>
              <p className="client-data-text">{currentClient.street ? currentClient.street : "-"}</p>
            </div>
            <div>
              <h3 className="client-data-title">Bairro</h3>
              <p className="client-data-text">{currentClient.neighborhood ? currentClient.neighborhood : "-"}</p>
            </div>
            <div>
              <h3 className="client-data-title">Complemento</h3>
              <p className="client-data-text">{currentClient.complement ? currentClient.complement : "-"}</p>
            </div>
            <div>
              <h3 className="client-data-title">CEP</h3>
              <p className="client-data-text">{currentClient.cep ? currentClient.cep : "-"}</p>
            </div>
            <div>
              <h3 className="client-data-title">Cidade</h3>
              <p className="client-data-text">{currentClient.city ? currentClient.city : "-"}</p>
            </div>
            <div>
              <h3 className="client-data-title">UF</h3>
              <p className="client-data-text">{currentClient.country_state ? currentClient.country_state : "-"}</p>
            </div>
          </div>
        </div>

        <div className="charges-client-data-table">
          <div className="title-charges-data">
            <h3 className="client-text-header">Cobranças do cliente</h3>
            <button
              className="new-charge-btn"
              onClick={() => setOpenAddChargesModal(true)}
            >+ Nova cobrança</button>
          </div>
          <div className="charges-client-head">
            <div className="small-container-head">
              <img src={Order} className="order-img" />
              <h3 className="client-data-title" >Id Cob.</h3>
            </div>
            <div className="small-container-head">
              <img src={Order} className="order-img" />
              <h3 className="client-data-title" >Data de venc.</h3>
            </div>
            <h3 className="client-data-title" >Valor</h3>
            <h3 className="client-data-title" >Status</h3>
            <h3 className="client-data-title" >Descrição</h3>
          </div>

          {
            currentClient.charges &&
            currentClient.charges.map((charge) => {
              return (
                <div className="charges-client-body" key={charge.id}>
                  <div
                    className="charges-client-body-clicked"
                    onClick={() => {
                      setChargesDetailsId(charge.id)
                      setOpenChargesDetailsModal(true);
                    }}
                  >
                    <p className="client-data-text-body id-cob">{charge.id}</p>
                    <p className="client-data-text-body due-date">{new Date(charge.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</p>
                    <p className="client-data-text-body value">{(charge.charge_value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    <div className="status-charge-container">
                      {
                        charge.status === "Vencida" &&
                        <p className="charge-data-status-unpaid status-row">
                          Vencido
                        </p>
                      }
                      {
                        charge.status === "Pago" &&
                        <p className="charge-data-status-paid status-row">
                          Pago
                        </p>
                      }
                      {
                        charge.status === "Pendente" &&
                        <p className="charge-data-status-pending  status-row">
                          Pendente
                        </p>
                      }

                    </div>
                    <p className="client-data-text-body-description">{charge.description}</p>
                  </div>
                  <div className="image-charges-client-container">
                    <div className="img-charge-client-body"
                    >
                      <img
                        className="img-charge-body"
                        src={EditIcon}
                        onClick={() => {
                          setOpenEditCharge(true);
                          setChargeSelected({
                            id_charge: charge.id,
                            customer_name: currentClient.name,
                            description: charge.description,
                            due_date: charge.date,
                            charge_value: charge.charge_value,
                            status: charge.status
                          });
                        }}
                      />
                      <p className="edit-charges-body-text">Editar</p>
                    </div>
                    <div className="img-charge-client-body">
                      <img src={DeleteIcon}
                        className="img-charge-body"
                        onClick={() => {
                          setOpenDeleteModal(true),
                            setDeleteChargeData([{ status: charge.status, date: charge.date, id: charge.id }])
                        }}
                      />
                      <p className="delete-charge-client-body">Deletar</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {openSuccessPopUp && <SuccessPopUp />}
        {openEditCharge && <EditCharge />}
      </div>
    </div>
  )
}
