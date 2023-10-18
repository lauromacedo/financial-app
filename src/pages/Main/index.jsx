import "./style.css";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import useModal from "../../hooks/useModal";
import EditUserModal from "../../components/EditUserModal";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import UnpaidImg from "../../assets/OverdueCharges.png";
import PlannedImg from "../../assets/ExpectedCharges.png";
import PaidImg from "../../assets/ChargesPaid.png";
import Client from "../../assets/Cliente-Inadimplente.svg";
import ClientPaid from "../../assets/Frame.svg";
import { Link } from "react-router-dom";
import useCharge from "../../hooks/useCharge";

export default function Main() {
  const { openEditModal } = useModal();

  const { setCurrentUser, renderUser } = useUser();
  const [allCharges, setAllCharges] = useState([]);
  const [unpaidCharges, setUnpaidCharges] = useState([]);
  const [allUnpaidValues, setAllUnpaidValues] = useState(0);
  const [previewCharges, setPreviewCharges] = useState([]);
  const [previewValue, setPreviewValue] = useState(0);
  const [paidCharges, setPaidCharges] = useState([]);
  const [paidValue, setPaidValue] = useState(0);

  const [allClients, setAllClients] = useState([]);
  const [paidClients, setPaidClients] = useState([]);
  const [unpaidClients, setUnpaidClients] = useState([]);

  const { setCurrentCharges, setCurrentCustomers } = useCharge();

  const token = getItem("token");

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
    async function getAllCharges() {
      const response = await api.get("/charges", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setAllCharges(response.data);

      const expiredCharges = allCharges.filter(charge => charge.status === "Vencida")
      setUnpaidCharges(expiredCharges)

      const totalUnpaid = unpaidCharges.reduce((prev, elem) => prev + elem.charge_value, 0)
      setAllUnpaidValues(totalUnpaid);

      const previewChargesSetup = allCharges.filter(charge => charge.status === "Pendente")
      setPreviewCharges(previewChargesSetup);

      const totalPreview = previewCharges.reduce((prev, elem) => prev + elem.charge_value, 0);
      setPreviewValue(totalPreview);

      const paidValueSetup = allCharges.filter(charge => charge.status === "Pago");
      setPaidCharges(paidValueSetup);

      const totalPaid = paidCharges.reduce((prev, elem) => prev + elem.charge_value, 0);
      setPaidValue(totalPaid);

    }


    getAllCharges();
  }, [allCharges]);


  useEffect(() => {
    async function getAllClients() {
      const response = await api.get("/customer", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setAllClients(response.data);

      const paidClientsSetup = allClients.filter((charge => charge.status === "Em dia"))
      setPaidClients(paidClientsSetup);

      const unpaidClientsSetup = allClients.filter((charge => charge.status === "Inadimplente"));
      setUnpaidClients(unpaidClientsSetup)

    }

    getAllClients();
  }, [allClients]);

  return (
    <div className='container-home'>
      <SideBar />
      <div className="content-container">
        <Header />
        <div className="tables-container">
          <div className="first-row">
            <div className="column-container">
              <div className="unpaid-card">
                <div>
                  <img className="unpaid-img" src={UnpaidImg} />
                </div>
                <div className="card-text">
                  <p className="card-title">Cobranças Vencidas</p>
                  <h2 className="card-value" >{allUnpaidValues.toLocaleString('pt-br', {
                    style: "currency", currency: "BRL"
                  })}</h2>
                </div>
              </div>
              <div className="table-container">
                <div className="table-title">
                  <h2 className="table-title-text">Cobranças Vencidas</h2>
                  <p className="unpaid-table-number">{unpaidCharges.length}</p>
                </div>
                <div className="table-head">
                  <p className="table-head-text">Cliente</p>
                  <p className="table-head-text">ID da cob.</p>
                  <p className="table-head-text">Valor</p>
                </div>
                {
                  unpaidCharges.slice(0, 4).map((charge) => {
                    return (
                      <div className="table-body" key={charge.id_charge}>
                        <p className="table-body-text table-body-name">{charge.customer_name}</p>
                        <p className="table-body-text table-body-id">{charge.id_charge}</p>
                        <p className="table-body-text value-charge-table">{charge.charge_value.toLocaleString('pt-br', {
                          style: "currency", currency: "BRL"
                        })}</p>
                      </div>
                    )
                  })
                }

                <div className="table-footer">
                  <Link 
                    to="/charges/status"
                    className="see-all"
                    onClick={() => setCurrentCharges(unpaidCharges)}
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            </div>
            <div className="column-container">
              <div className="planned-card">
                <div>
                  <img className="card-img" src={PlannedImg} />
                </div>
                <div className="card-text">
                  <p className="card-title">Cobranças Previstas</p>
                  <h2 className="card-value" >{previewValue.toLocaleString('pt-br', {
                    style: "currency", currency: "BRL"
                  })}</h2>
                </div>
              </div>
              <div className="table-container">
                <div className="table-title">
                  <h2 className="table-title-text">Cobranças Previstas</h2>
                  <p className="planned-table-number">{previewCharges.length}</p>
                </div>
                <div className="table-head">
                  <p className="table-head-text">Cliente</p>
                  <p className="table-head-text">ID da cob.</p>
                  <p className="table-head-text">Valor</p>
                </div>

                {
                  previewCharges.slice(0, 4).map((charge) => {
                    return (
                      <div className="table-body" key={charge.id_charge}>
                        <p className="table-body-text table-body-name">{charge.customer_name}</p>
                        <p className="table-body-text table-body-id">{charge.id_charge}</p>
                        <p className="table-body-text value-charge-table">{charge.charge_value.toLocaleString('pt-br', {
                          style: "currency", currency: "BRL"
                        })}</p>
                      </div>
                    )
                  })
                }
                <div className="table-footer">
                <Link
                    to="/charges/status" 
                    className="see-all"
                    onClick={() => setCurrentCharges(previewCharges)}
                >
                  Ver todos
                </Link>
                </div>
              </div>
            </div>
            <div className="column-container">
              <div className="paid-card">
                <div>
                  <img className="card-img" src={PaidImg} />
                </div>
                <div className="card-text">
                  <p className="card-title">Cobranças Pagas</p>
                  <h2 className="card-value" >{paidValue.toLocaleString('pt-br', {
                    style: "currency", currency: "BRL"
                  })}</h2>
                </div>
              </div>
              <div className="table-container">
                <div className="table-title">
                  <h2 className="table-title-text">Cobranças Pagas</h2>
                  <p className="paid-table-number">{paidCharges.length}</p>
                </div>
                <div className="table-head">
                  <p className="table-head-text">Cliente</p>
                  <p className="table-head-text">ID da cob.</p>
                  <p className="table-head-text">Valor</p>
                </div>
                {
                  paidCharges.slice(0, 4).map((charge) => {
                    return (
                      <div className="table-body" key={charge.id_charge}>
                        <p className="table-body-text table-body-name">{charge.customer_name}</p>
                        <p className="table-body-text table-body-id">{charge.id_charge}</p>
                        <p className="table-body-text value-charge-table">{charge.charge_value.toLocaleString('pt-br', {
                          style: "currency", currency: "BRL"
                        })}</p>
                      </div>
                    )
                  })
                }
                <div className="table-footer">
                <Link 
                    to="/charges/status" 
                    className="see-all"
                    onClick={() => setCurrentCharges(paidCharges)}
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="second-row">
            <div className="second-table-container">
              <div className="second-table-title">
                <div className="title-client-unpaid">
                  <img className="client-icon" src={Client} />
                  <h2 className="client-text">Clientes Inadimplentes</h2>
                </div>
                <p className="client-number">{unpaidClients.length}</p>
              </div>
              <div className="table-big-head">
                <p className="table-head-text table-body-name">Clientes</p>
                <p className="table-head-text table-body-id-client-head">ID do Clie.</p>
                <p className="table-head-text cpf">CPF</p>
              </div>

              {
                unpaidClients.slice(0, 4).map((client) => {
                  return (
                    <div className="table-body">
                      <p className="table-body-text table-body-name-client">{client.customer_name}</p>
                      <p className="table-body-text table-body-id-client">{client.id}</p>
                      <p className="table-body-text client-table-cpf ">{client.cpf}</p>
                    </div>
                  )
                })
              }

              <div className="table-footer-clients">
                <Link 
                  to="/clients/status" 
                  className="see-all"
                  onClick={() => setCurrentCustomers(unpaidClients)}
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="second-table-container">
              <div className="second-table-title">
                <div className="title-client-unpaid">
                  <img className="client-icon" src={ClientPaid} />
                  <h2 className="client-text">Clientes em dia</h2>
                </div>
                <p className="client-number-paid">{paidClients.length}</p>
              </div>
              <div className="table-big-head">
                <p className="table-head-text table-body-name">Clientes</p>
                <p className="table-head-text table-body-id-client-head">ID do clie.</p>
                <p className="table-head-text cpf">CPF</p>
              </div>
              {
                paidClients.slice(0, 4).map((client) => {
                  return (
                    <div className="table-body">
                      <p className="table-body-text table-body-name-client">{client.customer_name}</p>
                      <p className="table-body-text table-body-id-client">{client.id}</p>
                      <p className="table-body-text client-table-cpf">{client.cpf}</p>
                    </div>
                  )
                })
              }

              <div className="table-footer-clients">
                <Link 
                  to="/clients/status" 
                  className="see-all"
                  onClick={() => setCurrentCustomers(paidClients)}
                >
                  Ver todos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openEditModal && <EditUserModal />}
    </div>
  )
}

