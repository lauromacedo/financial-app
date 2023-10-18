import "./style.css";
import DownArrow from "../../assets/Down.png";
import InitialContainer from "../../assets/Initial-container.svg";
import PopUp from "../PopUp";
import useModal from "../../hooks/useModal";
import useUser from "../../hooks/useUser";


export default function DetailsHeader({ setOpenDetails, openDetails }) {
  const { openPopUp, setOpenPopUp } = useModal();
  const { currentUser } = useUser();


  return (
    <div className="header-container" >

      {!openDetails &&
        <div className="title-details-header">
          <p className="text-details-header-active"
            onClick={() => setOpenDetails(false)}
          >Clientes</p>
        </ div>
      }

      {
        openDetails &&
        <div className="title-details-header">
          <p className="text-details-header-active"
            onClick={() => setOpenDetails(false)}
          >Clientes</p>
          <p className="text-details-header-inactive">&gt;</p>
          <p className="text-details-header-inactive">Detalhes do cliente</p>
        </div>
      }

      <div className="user-container">
        <div className="user-initials">
          <img className="user-img" src={InitialContainer} />
          <h1 className="user-initials-text">{currentUser.user_name.slice(0, 1)}</h1>
        </div>
        <div className="user">
          <div className="user-main">
            <p className="user-text">{currentUser.user_name.split(" ")[0]}</p>
            <img onClick={() => setOpenPopUp(!openPopUp)} src={DownArrow} alt="Ícone para abrir e fechar pop-up" />
          </div>
          {openPopUp && <PopUp />}
        </div>
      </div>
    </div>

  )
}