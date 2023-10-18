import "./style.css";
import successIcon from "../../assets/success-icon.svg";
import closePopUp from "../../assets/close-pop-up-icon.svg";

export default function DeleteSucessPopUp({ setSucessDeleteCharge }) {

  return (
    <div className="success-pop-up">
      <div className="success-content">
        <div className="success-response">
          <img
            src={successIcon}
            alt="Ícone de checked"
          />
          <p>Cobrança deletada com sucesso!</p>
        </div>
        <img
          className="close-pop-up"
          src={closePopUp}
          alt="Ícone de fechar Pop-up"
          onClick={() => setSucessDeleteCharge(false)}
        />
      </div>
    </div>
  );
}