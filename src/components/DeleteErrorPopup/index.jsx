import "./style.css";
import ErrorIcon from "../../assets/delete-error.svg"
import closePopUp from "../../assets/close-popup-error.svg";



export default function DeleteErrorPopup({ setDeleteError }) {

  return (
    <div className="error-pop-up">
      <div className="error-content">
        <img
          src={ErrorIcon}
          alt="Ícone de checked"
        />
        <p className="error-response">Esta cobrança não pode ser excluída!</p>
      </div>
      <img
        className="close-pop-up"
        src={closePopUp}
        alt="Ícone de fechar Pop-up"
        onClick={() => setDeleteError(false)}
      />
    </div>

  );
}