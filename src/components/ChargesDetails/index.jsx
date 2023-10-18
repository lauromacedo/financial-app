import "./style.css";
import Charges from "../../assets/ChargesNotActive.png";
import CloseIcon from "../../assets/close.png";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/storage";
import api from "../../services/api";


export default function ChargesDetails({ setOpenChargesDetailsModal, chargesDetailsId }) {
  const token = getItem("token");

  const [chargeDetailsData, setChargeDetailsData] = useState([]);
  const [chargeValue, setChargeValue] = useState();


  useEffect(() => {
    async function getChargeDetail() {
      try {
        const response = await api.get(`/charges/${chargesDetailsId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setChargeDetailsData(response.data[0]);
        setChargeValue(chargeDetailsData.charge_value.toLocaleString('pt-br', {
          style: "currency", currency: "BRL"
        }))
      } catch (error) {
        return error.message;
      }

    }
    getChargeDetail();
  }, [chargeDetailsData]);


  return (
    <div className="charges-details-modal-container">
      <div className="content-charges-details-container ">
        <div className="charges-details-modal-header" >
          <div className="title-charges-details-modal-container" >
            <img className="img-title-charges-details-modal" src={Charges} />
            <h1 className="title-charges-details-modal-text">Detalhes de Cobrança</h1>
          </div>
          <img className="close-charges-details-modal" src={CloseIcon} onClick={() => setOpenChargesDetailsModal(false)} />
        </div>

        <div className="body-charges-detail-body">
          <div>
            <p className="title-body-charges-details-modal">
              Nome
            </p>
            <p className="text-body-charges-details-modal">
              {chargeDetailsData.customer_name}
            </p>
          </div>
          <div className="description-charges-details-container">
            <p className="title-body-charges-details-modal">
              Descrição
            </p>
            <p className="text-body-charges-details-modal charges-details-description">
              {chargeDetailsData.description}
            </p>
          </div>
          <div className="horizontal-container-charges-details">
            <div className="horizontal-mini-container-charges-details">
              <div>
                <p className="title-body-charges-details-modal">
                  Vencimento
                </p>
                <p className="text-body-charges-details-modal">
                  {new Date(chargeDetailsData.due_date
                  ).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                </p>
              </div>
              <div>
                <p className="title-body-charges-details-modal">
                  ID cobranças
                </p>
                <p className="text-body-charges-details-modal">
                  {chargeDetailsData.id}
                </p>
              </div>
            </div>
            <div className="horizontal-mini-container-charges-details">
              <div>
                <p className="title-body-charges-details-modal">
                  Valor
                </p>
                <p className="text-body-charges-details-modal">
                  {chargeValue}
                </p>
              </div>
              <div>
                <p className="title-body-charges-details-modal">
                  Status
                </p>
                {
                  chargeDetailsData.status === "Vencida" &&
                  <p className="charge-details-status-unpaid">
                    Vencida
                  </p>}

                {
                  chargeDetailsData.status === "Pendente" &&
                  <p className="charge-details-status-pending">
                    Pendente
                  </p>}

                {
                  chargeDetailsData.status === "Pago" &&
                  <p className="charge-details-status-paid">
                    Pago
                  </p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}