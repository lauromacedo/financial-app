import SideBar from "../../components/SideBar";
import "./style.css";
import Filter from "../../assets/filter.svg";
import Search from "../../assets/search.svg";
import HeaderCharges from "../../components/HeaderCharges";
import ChargesImg from "../../assets/ChargesNotActive.png";
import Order from "../../assets/order.svg";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/storage";
import useModal from "../../hooks/useModal";
import EditCharge from "../../components/EditCharge";
import EditUserModal from "../../components/EditUserModal";
import useUser from "../../hooks/useUser";
import useCharge from "./../../hooks/useCharge";
import SuccessPopUp from "../../components/SuccessPopUp";
import ChargesDetails from "../../components/ChargesDetails";
import DeleteModal from "../../components/DeleteModal";
import DeleteSucessPopup from "../../components/DeleteSucessPopup";
import DeleteErrorPopup from "../../components/DeleteErrorPopup";
import NotFound from "../../components/NotFound";
import { useLocation } from "react-router-dom";

export default function Charges() {
  const token = getItem("token");
  const [chargesData, setChargesData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sucessDeleteCharge, setSucessDeleteCharge] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const location = useLocation();

  const { openEditCharge, setOpenEditCharge, openEditModal, openSuccessPopUp } =
    useModal();

  const { renderCharge, setChargeSelected, currentCharges, setCurrentCharges, test } =
    useCharge();

  const [chargesFiltered, setChargesFiltered] = useState([]);

  const { setCurrentUser, renderUser } = useUser();

  const [chargesDetailsName, setChargesDetailsName] = useState("");

  const [searchCharge, setSearchCharge] = useState("");
  
  function handleSearchCharge() {
    if (location.pathname === "/charges") {
      const charges = chargesData.filter((charge) => {
        if (
          charge.customer_name
            .toLowerCase()
            .includes(searchCharge.toLowerCase())
        ) {
          return charge;
        }
  
        if (charge.id_charge == searchCharge) {
          return charge;
        }
      });
  
      setChargesFiltered(charges);
    } else {
      const charges = currentCharges.filter((currentCharge) => {
        if (
          currentCharge.customer_name
            .toLowerCase()
            .includes(searchCharge.toLowerCase())
        ) {
          return currentCharge;
        }
  
        if (currentCharge.id_charge == searchCharge) {
          return currentCharge;
        }
      });
  
      setChargesFiltered(charges);
    }
  }

  function handleOrderByName() {
    if (location.pathname === "/charges") {
      const orderlyByName = chargesData.sort((a, b) => {
        return a.customer_name < b.customer_name
          ? -1
          : a.customer_name > b.customer_name
          ? 1
          : 0;
      });
  
      setChargesData([...orderlyByName]);
    } else {
      const orderlyByName = currentCharges.sort((a, b) => {
        return a.customer_name < b.customer_name
          ? -1
          : a.customer_name > b.customer_name
          ? 1
          : 0;
      });
  
      setChargesData([...orderlyByName]);
    }
  }

  function handleOrderByIdentifier() {
    if (location.pathname === "/charges") {
      const orderlyByIdentifier = chargesData.sort((a, b) => {
        return a.id_charge < b.id_charge
          ? -1
          : a.id_charge > b.id_charge
          ? 1
          : 0;
      });

      setChargesData([...orderlyByIdentifier]);
    } else {
      const orderlyByIdentifier = currentCharges.sort((a, b) => {
        return a.id_charge < b.id_charge
          ? -1
          : a.id_charge > b.id_charge
          ? 1
          : 0;
      });

      setCurrentCharges([...orderlyByIdentifier]);
    }
  }

  useEffect(() => {
    async function getUser() {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUser(response.data);
    }

    getUser();
  }, [renderUser]);

  const [chargesDetailsId, setChargesDetailsId] = useState();

  const [deleteChargeData, setDeleteChargeData] = useState();

  const [openChargesDetailsModal, setOpenChargesDetailsModal] = useState(false);

  useEffect(() => {
    async function getCharges() {
      try {
        const response = await api.get("/charges", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setChargesData([...response.data]);
      } catch (error) {
        return error.message;
      }
    }

    getCharges();
  }, [renderCharge, test]);

  return (
    <div className="container-charges">
      {openChargesDetailsModal && (
        <ChargesDetails
          setOpenChargesDetailsModal={setOpenChargesDetailsModal}
          chargesDetailsId={chargesDetailsId}
        />
      )}

      {openDeleteModal && (
        <DeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          setDeleteError={setDeleteError}
          deleteChargeData={deleteChargeData}
          setSucessDeleteCharge={setSucessDeleteCharge}
        />
      )}

      {sucessDeleteCharge && (
        <DeleteSucessPopup setSucessDeleteCharge={setSucessDeleteCharge} />
      )}

      {deleteError && <DeleteErrorPopup setDeleteError={setDeleteError} />}

      <SideBar />
      <div className="content-container">
        <HeaderCharges />
        <div className="first-row-charges">
          <div className="charges-div">
            <img className="charges-img" src={ChargesImg} />
            <h1 className="charges-title">Cobranças</h1>
          </div>
          <div className="functionalities-div">
            <div className="filter-container">
              <img src={Filter} className="filter-btn" />
            </div>
            <div className="input-charges-container">
              <input
                className="input-search"
                type="text"
                placeholder="Pesquisa"
                value={searchCharge}
                onChange={(e) => setSearchCharge(e.target.value)}
                onKeyUp={handleSearchCharge}
              />
              <img src={Search} className="search-img" />
            </div>
          </div>
        </div>
        <div className="charges-table-container">
          <div className="charges-table-head">
            <div className="charges-head">
              <img
                className="order-icon"
                src={Order}
                alt="Botão de ordenação de tabela"
                onClick={handleOrderByName}
              />
              <p className="charges-text-table-head">Cliente</p>
            </div>
            <div className="charges-head">
              <img
                className="order-icon"
                src={Order}
                alt="Botão de ordenação de tabela"
                onClick={handleOrderByIdentifier}
              />
              <p className="charges-text-table-head">ID Cob.</p>
            </div>
            <p className="charges-text-table-head">Valor</p>
            <p className="charges-text-table-head">Data de venc.</p>
            <p className="charges-text-table-head">Status</p>
            <p className="charges-text-table-head">Descrição</p>
          </div>
          {location.pathname === "/charges" && !searchCharge
            && chargesData.map((charge) => {
                return (
                  <div key={charge.id_charge} className="table-charges-body">
                    <div
                      className="table-charges-body-clicked"
                      onClick={() => {
                        setOpenChargesDetailsModal(true);
                        setChargesDetailsId(charge.id_charge);
                        setChargesDetailsName(charge.customer_name);
                      }}
                    >
                      <p className="charges-text-table-body charges-name">
                        {charge.customer_name}
                      </p>
                      <p className="charges-text-table-body id-charges">
                        {charge.id_charge}
                      </p>
                      <p className="charges-text-table-body charges-value">
                        {charge.charge_value.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                      <p className="charges-text-table-body venc-date-charges">
                        {new Date(charge.due_date).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </p>
                      {charge.status === "Pago" && (
                        <p className="charge-status-paid status-charge-table">
                          Pago
                        </p>
                      )}
                      {charge.status === "Vencida" && (
                        <p className="charge-status-unpaid  status-charge-table">
                          Vencida
                        </p>
                      )}
                      {charge.status === "Pendente" && (
                        <p className="charge-status-pending status-charge-table">
                          Pendente
                        </p>
                      )}
                      <p className="description-table-body charges-description-body">
                        {charge.description}
                      </p>
                    </div>
                    <div className="icons-container-charge">
                      <div className="icon-container-charges-body">
                        <img
                          className="image-charge-body"
                          src={Edit}
                          onClick={() => {
                            setOpenEditCharge(true);
                            setChargeSelected(charge);
                          }}
                        />
                        <p className="charge-edit-text">Editar</p>
                      </div>
                      <div className="icon-container-body">
                        <img
                          className="image-charge-body"
                          src={Delete}
                          onClick={() => {
                            setOpenDeleteModal(true),
                              setDeleteChargeData([
                                {
                                  status: charge.status,
                                  date: charge.due_date,
                                  id: charge.id_charge,
                                },
                              ]);
                          }}
                        />
                        <p className="charge-delete-text">Excluir</p>
                      </div>
                    </div>
                  </div>
                );
              })
          } 
          {location.pathname === "/charges" && chargesFiltered.length >= 1 && searchCharge && chargesFiltered.map((chargeFiltered) => {
                return (
                  <div
                    className="table-charges-body"
                    key={chargeFiltered.id_charge}
                    onClick={() => {
                      setOpenChargesDetailsModal(true),
                        setChargesDetailsId(chargeFiltered.id_charge),
                        setChargesDetailsName(chargeFiltered.customer_name);
                    }}
                  >
                    <p className="charges-text-table-body charges-name">
                      {chargeFiltered.customer_name}
                    </p>
                    <p className="charges-text-table-body id-charges">
                      {chargeFiltered.id_charge}
                    </p>
                    <p className="charges-text-table-body charges-value">
                      {chargeFiltered.charge_value.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <p className="charges-text-table-body venc-date-charges">
                      {new Date(chargeFiltered.due_date).toLocaleDateString(
                        "pt-BR",
                        { timeZone: "UTC" }
                      )}
                    </p>
                    {chargeFiltered.status === "Pago" && (
                      <p className="charge-status-paid status-charge-table">
                        Pago
                      </p>
                    )}
                    {chargeFiltered.status === "Vencida" && (
                      <p className="charge-status-unpaid  status-charge-table">
                        Vencida
                      </p>
                    )}
                    {chargeFiltered.status === "Pendente" && (
                      <p className="charge-status-pending status-charge-table">
                        Pendente
                      </p>
                    )}
                    <p className="description-table-body charges-description-body">
                      {chargeFiltered.description}
                    </p>
                    <div className="icons-container-charge">
                      <div className="icon-container-charges-body">
                        <img
                          className="image-charge-body"
                          src={Edit}
                          onClick={() => {
                            setOpenEditCharge(true);
                            setChargeSelected(chargeFiltered);
                          }}
                        />
                        <p className="charge-edit-text">Editar</p>
                      </div>
                      <div className="icon-container-body">
                        <img className="image-charge-body" src={Delete} />
                        <p className="charge-delete-text">Excluir</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          {location.pathname === "/charges/status" && !searchCharge &&
            currentCharges.map((currentCharge) => {
                return (
                  <div key={currentCharge.id_charge} className="table-charges-body">
                    <div
                      className="table-charges-body-clicked"
                      onClick={() => {
                        setOpenChargesDetailsModal(true);
                        setChargesDetailsId(currentCharge.id_charge);
                        setChargesDetailsName(currentCharge.customer_name);
                      }}
                    >
                      <p className="charges-text-table-body charges-name">
                        {currentCharge.customer_name}
                      </p>
                      <p className="charges-text-table-body id-charges">
                        {currentCharge.id_charge}
                      </p>
                      <p className="charges-text-table-body charges-value">
                        {currentCharge.charge_value.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                      <p className="charges-text-table-body venc-date-charges">
                        {new Date(currentCharge.due_date).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </p>
                      {currentCharge.status === "Pago" && (
                        <p className="charge-status-paid status-charge-table">
                          Pago
                        </p>
                      )}
                      {currentCharge.status === "Vencida" && (
                        <p className="charge-status-unpaid  status-charge-table">
                          Vencida
                        </p>
                      )}
                      {currentCharge.status === "Pendente" && (
                        <p className="charge-status-pending status-charge-table">
                          Pendente
                        </p>
                      )}
                      <p className="description-table-body charges-description-body">
                        {currentCharge.description}
                      </p>
                    </div>
                    <div className="icons-container-charge">
                      <div className="icon-container-charges-body">
                        <img
                          className="image-charge-body"
                          src={Edit}
                          onClick={() => {
                            setOpenEditCharge(true);
                            setChargeSelected(currentCharge);
                          }}
                        />
                        <p className="charge-edit-text">Editar</p>
                      </div>
                      <div className="icon-container-body">
                        <img
                          className="image-charge-body"
                          src={Delete}
                          onClick={() => {
                            setOpenDeleteModal(true),
                              setDeleteChargeData([
                                {
                                  status: currentCharge.status,
                                  date: currentCharge.due_date,
                                  id: currentCharge.id_charge,
                                },
                              ]);
                          }}
                        />
                        <p className="charge-delete-text">Excluir</p>
                      </div>
                    </div>
                  </div>
                );
              })
          }
          {location.pathname === "/charges/status" && chargesFiltered.length >= 1 && searchCharge && chargesFiltered.map((chargeFiltered) => {
                return (
                  <div
                    className="table-charges-body"
                    key={chargeFiltered.id_charge}
                    onClick={() => {
                      setOpenChargesDetailsModal(true),
                        setChargesDetailsId(chargeFiltered.id_charge),
                        setChargesDetailsName(chargeFiltered.customer_name);
                    }}
                  >
                    <p className="charges-text-table-body charges-name">
                      {chargeFiltered.customer_name}
                    </p>
                    <p className="charges-text-table-body id-charges">
                      {chargeFiltered.id_charge}
                    </p>
                    <p className="charges-text-table-body charges-value">
                      {chargeFiltered.charge_value.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <p className="charges-text-table-body venc-date-charges">
                      {new Date(chargeFiltered.due_date).toLocaleDateString(
                        "pt-BR",
                        { timeZone: "UTC" }
                      )}
                    </p>
                    {chargeFiltered.status === "Pago" && (
                      <p className="charge-status-paid status-charge-table">
                        Pago
                      </p>
                    )}
                    {chargeFiltered.status === "Vencida" && (
                      <p className="charge-status-unpaid  status-charge-table">
                        Vencida
                      </p>
                    )}
                    {chargeFiltered.status === "Pendente" && (
                      <p className="charge-status-pending status-charge-table">
                        Pendente
                      </p>
                    )}
                    <p className="description-table-body charges-description-body">
                      {chargeFiltered.description}
                    </p>
                    <div className="icons-container-charge">
                      <div className="icon-container-charges-body">
                        <img
                          className="image-charge-body"
                          src={Edit}
                          onClick={() => {
                            setOpenEditCharge(true);
                            setChargeSelected(chargeFiltered);
                          }}
                        />
                        <p className="charge-edit-text">Editar</p>
                      </div>
                      <div className="icon-container-body">
                        <img className="image-charge-body" src={Delete} />
                        <p className="charge-delete-text">Excluir</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          {chargesFiltered.length < 1 && searchCharge && <NotFound />}
        </div>
        {openSuccessPopUp && <SuccessPopUp />}
        {openEditCharge && <EditCharge />}
      </div>
      {openEditModal && <EditUserModal />}
    </div>
  );
}
