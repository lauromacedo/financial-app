import "./style.css";
import HomeActive from "../../assets/HomeActive.png";
import Home from "../../assets/HomeNotActive.png"
import Client from "../../assets/ClientNotActive.png";
import ClientActive from "../../assets/ClientActive.png"
import Charges from "../../assets/ChargesNotActive.png";
import ChargesActive from "../../assets/Charge-Active.svg";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div className="cards">
        <div className={location.pathname === "/main" ? "card active" : "card"}>
          <img className="card-image" src={location.pathname === "/main" ? HomeActive : Home} onClick={() => navigate("/main")} />
          <p className={location.pathname === "/main" ? "card-text-active" : "card-text-inactive"}>Home</p>
        </div>
        <div className={location.pathname === "/clients" || location.pathname === "/clients/details" ? "card active" : "card"}>
          <img className="card-image" src={location.pathname === "/clients" || location.pathname === "/clients/details" ? ClientActive : Client} onClick={() => navigate("/clients")} />
          <p className={location.pathname === "/clients" || location.pathname === "/clients/details" ? "card-text-active" : "card-text-inactive"}>Clientes</p>
        </div>
        <div className={location.pathname === "/charges" ? "card active" : "card"}>
          <img className="card-image" src={location.pathname === "/charges" ? ChargesActive : Charges} onClick={() => navigate("/charges")} />
          <p className={location.pathname === "/charges" ? "card-text-active" : "card-text-inactive"}>Cobranças</p>
        </div>
      </div>
    </div>
  )
}