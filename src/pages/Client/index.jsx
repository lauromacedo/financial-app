import "./style.css";
import ClientsModal from "../../components/ClientsModal";
import EditUserModal from "../../components/EditUserModal";
import SideBar from "../../components/SideBar";
import DetailsHeader from "../../components/DetailsHeader";
import Client from "../../assets/ClientNotActive.png";
import Filter from "../../assets/filter.svg";
import Search from "../../assets/search.svg";
import Order from "../../assets/order.svg";
import AddCharger from "../../assets/add-charge.svg";
import { useState, useEffect } from "react";
import api from "../../services/api";
import AddChargesModal from "../../components/AddChargesModal";
import useModal from "../../hooks/useModal";
import { getItem } from "../../utils/storage";
import ClientDetails from "../../components/ClientDetails";
import useUser from "../../hooks/useUser";
import AddChargesSucess from "../../components/AddChargesSucess";
import NotFound from "../../components/NotFound";
import { useLocation } from "react-router-dom";
import useCharge from "../../hooks/useCharge";

export default function Clients() {
  const { openEditModal, openAddChargesModal, setOpenAddChargesModal } = useModal();
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientsData, setClientsData] = useState([]);
  const [clientId, setClientId] = useState();

  const [openDetails, setOpenDetails] = useState(false);
  const [renderCustomer, setRenderCustomer] = useState(false);
  const [openPopupSucess, setOpenPopupSucess] = useState(false);
  const [customersFiltered, setCustomersFiltered] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");

  const token = getItem("token");
  const location = useLocation();
  const { currentCustomers, setCurrentCustomers } = useCharge();
  const { setCurrentUser, renderUser } = useUser();

  function handleSearchCustomer() {
    if (location.pathname === "/clients") {
      const customers = clientsData.filter(client => {
        if (client.customer_name.toLowerCase().includes(searchCustomer.toLowerCase())) {
          return client;
        }

        if (client.cpf.includes(searchCustomer)) {
          return client;
        }

        if (client.email.toLowerCase().includes(searchCustomer.toLowerCase())) {
          return client;
        }
      });

      setCustomersFiltered(customers);
    } else {
      const customers = currentCustomers.filter(currentCustomer => {
        if (currentCustomer.customer_name.toLowerCase().includes(searchCustomer.toLowerCase())) {
          return currentCustomer;
        }

        if (currentCustomer.cpf.includes(searchCustomer)) {
          return currentCustomer;
        }

        if (currentCustomer.email.toLowerCase().includes(searchCustomer.toLowerCase())) {
          return currentCustomer;
        }
      });

      setCustomersFiltered(customers);
    }
  }

  function handleOrderByName() {
    if (location.pathname === "/clients") {
      const orderlyByName = clientsData.sort((a, b) => {
        return a.customer_name < b.customer_name ? -1 : a.customer_name > b.customer_name ? 1 : 0;
      });

      setClientsData([...orderlyByName]);
    } else {
      const orderlyByName = currentCustomers.sort((a, b) => {
        return a.customer_name < b.customer_name ? -1 : a.customer_name > b.customer_name ? 1 : 0;
      });

      setCurrentCustomers([...orderlyByName]);
    }
  }

  useEffect(() => {
    async function getUser() {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setCurrentUser(response.data);
    }

    getUser();
  }, [renderUser]);

  useEffect(() => {
    async function getClients() {
      try {
        const response = await api.get("/customer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setClientsData(response.data);
      } catch (error) {
        return error.message;
      }
    }

    getClients();
  }, [renderCustomer]);

  return (
    <div className="clients-container" >
      {openAddClientModal &&
        <ClientsModal
          renderCustomer={renderCustomer}
          setRenderCustomer={setRenderCustomer}
          setOpenAddClientModal={setOpenAddClientModal}
        />
      }
      {openAddChargesModal &&
        <AddChargesModal
          clientId={clientId}
          renderCustomer={renderCustomer}
          setRenderCustomer={setRenderCustomer}
          clientName={clientName}
          setOpenPopupSucess={setOpenPopupSucess}
        />
      }

      <SideBar />
      {
        openDetails &&
        <ClientDetails
          setOpenDetails={setOpenDetails}
          openDetails={openDetails}
          clientId={clientId}
          renderCustomer={renderCustomer}
          setRenderCustomer={setRenderCustomer}
          setOpenAddChargesModal={setOpenAddChargesModal}
          setOpenPopupSucess={setOpenPopupSucess}
          openPopupSucess={openPopupSucess}
        />


      }

      {!openDetails &&

        <div className="content-container">
          <DetailsHeader />

          {openPopupSucess &&

            <AddChargesSucess setOpenPopupSucess={setOpenPopupSucess} />
          }
          <div className="first-row-clients">
            <div className="client-div">
              <img className="client-img" src={Client} />
              <h1 className="client-title">Clientes</h1>
            </div>
            <div className="functionalities-div">
              <button
                type="button"
                className="add-client-btn"
                onClick={() => setOpenAddClientModal(true)}
              >+ Adicionar cliente</button>
              <div className="filter-container">
                <img src={Filter} className="filter-btn" />
              </div>
              <div className="input-client-container" >
                <input
                  className="input-search"
                  type="text"
                  value={searchCustomer}
                  onChange={(e) => setSearchCustomer(e.target.value)}
                  onKeyUp={handleSearchCustomer}
                  placeholder="Pesquisa"
                />
                <img src={Search} className="search-img" />
              </div>
            </div>
          </div>
          <div className="clients-table-container">
            <div className="client-table-head">
              <div className="client-head">
                <img
                  className="icon-order"
                  src={Order}
                  alt="Botão de ordenação"
                  onClick={handleOrderByName}
                />
                <p className="text-table-head">Cliente</p>
              </div>
              <p className="text-table-head">CPF</p>
              <p className="text-table-head">E-mail</p>
              <p className="text-table-head">Telefone</p>
              <p className="text-table-head">Status</p>
              <p className="text-table-head">Criar Cobrança</p>
            </div>
            {location.pathname === "/clients" &&
              !searchCustomer &&
              clientsData.map((client) => {
                return (
                  <div className="table-body" key={client.id} id={client.id}>
                    <p className="text-table-body client" onClick={() => {
                      setOpenDetails(true)
                      setClientId(client.id)
                    }}>{client.customer_name}</p>
                    <p className="text-table-body">{client.cpf}</p>
                    <p className="text-table-body">{client.email}</p>
                    <p className="text-table-body">{client.phone}</p>
                    <div className="client-status-container">
                      <p className={client.status === "Inadimplente" ? "client-status-unpaid" : "client-status-paid"}>{client.status}</p>
                    </div>

                    <div className="add-charge" onClick={() => {
                      setClientName(client.customer_name)
                      setOpenAddChargesModal(true)
                    }}>
                      <img
                        className="add-charge-img"
                        src={AddCharger}
                        onClick={() => setClientId(client.id)}
                      />
                      <p className="add-charge-text">Cobrança</p>
                    </div>
                  </div>
                )
              })}
            {location.pathname === "/clients" && customersFiltered.length >= 1 && searchCustomer && customersFiltered.map((customer) => {
              return (
                <div className="table-body" key={customer.id} id={customer.id}>
                  <p className="text-table-body client" onClick={() => {
                    setOpenDetails(true)
                    setClientId(customer.id)
                  }}>{customer.customer_name}</p>
                  <p className="text-table-body">{customer.cpf}</p>
                  <p className="text-table-body">{customer.email}</p>
                  <p className="text-table-body">{customer.phone}</p>
                  <div className="client-status-container">
                    <p className={customer.status === "Inadimplente" ? "client-status-unpaid" : "client-status-paid"}>{customer.status}</p>
                  </div>

                  <div className="add-charge" onClick={() => {
                    setClientName(customer.customer_name)
                    setOpenAddChargesModal(true)
                  }}>
                    <img
                      className="add-charge-img"
                      src={AddCharger}
                      onClick={() => setClientId(client.id)}
                    />
                    <p className="add-charge-text">Cobrança</p>
                  </div>
                </div>
              )
            })
            }
            {location.pathname === "/clients/status" &&
              !searchCustomer &&
              currentCustomers.map((currentCustomer) => {
                return (
                  <div className="table-body" key={currentCustomer.id} id={currentCustomer.id}>
                    <p className="text-table-body client" onClick={() => {
                      setOpenDetails(true)
                      setClientId(currentCustomer.id)
                    }}>{currentCustomer.customer_name}</p>
                    <p className="text-table-body">{currentCustomer.cpf}</p>
                    <p className="text-table-body">{currentCustomer.email}</p>
                    <p className="text-table-body">{currentCustomer.phone}</p>
                    <div className="client-status-container">
                      <p className={currentCustomer.status === "Inadimplente" ? "client-status-unpaid" : "client-status-paid"}>{currentCustomer.status}</p>
                    </div>

                    <div className="add-charge" onClick={() => {
                      setClientName(currentCustomer.customer_name)
                      setOpenAddChargesModal(true)
                    }}>
                      <img
                        className="add-charge-img"
                        src={AddCharger}
                        onClick={() => setClientId(currentCustomer.id)}
                      />
                      <p className="add-charge-text">Cobrança</p>
                    </div>
                  </div>
                )
              })}
            {location.pathname === "/clients/status" && customersFiltered.length >= 1 && searchCustomer && customersFiltered.map((customer) => {
              return (
                <div className="table-body" key={customer.id} id={customer.id}>
                  <p className="text-table-body client" onClick={() => {
                    setOpenDetails(true)
                    setClientId(customer.id)
                  }}>{customer.customer_name}</p>
                  <p className="text-table-body">{customer.cpf}</p>
                  <p className="text-table-body">{customer.email}</p>
                  <p className="text-table-body">{customer.phone}</p>
                  <div className="client-status-container">
                    <p className={customer.status === "Inadimplente" ? "client-status-unpaid" : "client-status-paid"}>{customer.status}</p>
                  </div>

                  <div className="add-charge" onClick={() => {
                    setClientName(customer.customer_name)
                    setOpenAddChargesModal(true)
                  }}>
                    <img
                      className="add-charge-img"
                      src={AddCharger}
                      onClick={() => setClientId(client.id)}
                    />
                    <p className="add-charge-text">Cobrança</p>
                  </div>
                </div>
              )
            })
            }
            {customersFiltered.length < 1 && searchCustomer && <NotFound />}
          </div>
        </div>
      }
      {openEditModal && <EditUserModal />}
    </div>
  )
}