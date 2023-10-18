import "./style.css";
import Checked from "../../assets/blue-check.svg";
import Close from "../../assets/close-blue.svg";

export default function AddChargesSucess({ setOpenPopupSucess }) {
  return (
    <div className="container-page-sucess">
      <div className="container-content-popup-sucess">
        <div className="popup-content-sucess">
          <img src={Checked} />
          <p className="text-content-popup-sucess">
            Cobrança cadastrada com sucesso
          </p>
        </div>
        <img className="close-popup-icon" src={Close} onClick={() => setOpenPopupSucess(false)} />
      </div>
    </div>
  )
}