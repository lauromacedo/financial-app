import "./style.css";
import successIcon from "../../assets/success-icon.svg";
import closePopUp from "../../assets/close-pop-up-icon.svg";
import useModal from "../../hooks/useModal";

export default function SuccessPopUp() {
  const { setOpenSuccessPopUp } = useModal();
  return (
    <div className="success-pop-up">
      <div className="success-content">
        <div className="success-response">
          <img
            src={successIcon}
            alt="Ícone de checked"
          />
          <p>Cobrança editada com sucesso!</p>
        </div>
        <img
          className="close-pop-up"
          src={closePopUp}
          alt="Ícone de fechar Pop-up"
          onClick={() => setOpenSuccessPopUp(false)}
        />
      </div>
    </div>
  );
}