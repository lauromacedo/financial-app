import "./style.css";
import WhiteStep from "../../assets/white-step.svg";
import GreenStep from "../../assets/green-step.svg";
import StepDone from "../../assets/steps-done.svg";



export default function Stepper({ currentStep }) {


  return (
    <div className="stepper-container">
      <div className="step">
        <img className="image-step" src={currentStep === 0 ? GreenStep : StepDone} />
        <div className="step-text">
          <h2 className="step-title">Cadastre-se</h2>
          <p className="step-text">Por favor, escreva seu nome e e-mail</p>
        </div>
      </div>
      <div className="step">
        {currentStep === 0 &&
          <img className="image-step" src={WhiteStep} />}
        {currentStep === 1 &&
          <img className="image-step" src={GreenStep} />
        }
        {currentStep === 2 &&
          <img className="image-step" src={StepDone} />
        }
        <div className="step-text">
          <h2 className="step-title">Escolha uma senha</h2>
          <p className="step-text">Escolha uma senha segura</p>
        </div>
      </div>
      <div className="step">
        <img className="image-step" src={currentStep < 2 ? WhiteStep : StepDone} />
        <div className="step-text">
          <h2 className="step-title">Cadastro realizado com sucesso</h2>
          <p className="step-text">E-mail e senha cadastrados com sucesso</p>
        </div>
      </div>
    </div>
  );
}