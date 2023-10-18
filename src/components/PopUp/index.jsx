import "./style.css";
import arrowUp from "../../assets/polygon-up.svg";
import editIcon from "../../assets/icon-edit.svg";
import logoutIcon from "../../assets/icon-logout.svg";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";

export default function PopUp() {
  const navigate = useNavigate();

  const { setOpenEditModal } = useModal();
  const { setOpenPopUp } = useModal();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setOpenPopUp(false);

    navigate("/sign-in");
  }

  return (
    <div className="container-pop-up">
      <img src={arrowUp} alt="Ícone branco de seta para cima" className="arrow-up" />
      <div className="pop-up">
        <div className="icon" 
          onClick={()=> { 
            setOpenEditModal(true);
            setOpenPopUp(false);
          }}
        >
          <img src={editIcon} alt="Ícone de edição de usuário" className="edit-icon" />
          <p className="edit-title">Editar</p>
        </div>
        <div className="icon" onClick={handleLogout}>
          <img src={logoutIcon} alt="Ícone de logout" className="logout-icon" />
          <p>Sair</p>
        </div>
      </div>
    </div>
  );
}