import "./style.css";
import notFoundImg from "../../assets/not-found.png";

export default function NotFound() {
  return (
    <div className="not-found">
      <img 
        src={notFoundImg} 
        alt="Cobrança não encontrada"   
      />
    </div>
  );
}