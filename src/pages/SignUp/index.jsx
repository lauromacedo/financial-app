import Stepper from "../../components/Stepper";
import './style.css';
import GreenRectangle from '../../assets/green-rectangle.svg';
import GrayRectangle from '../../assets/gray-rectangle.svg';
import SucessSignUp from '../../components/SucessSignUp';
import UserDataForm from '../../components/UserDataForm';
import UserPasswordForm from '../../components/UserPasswordForm';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import { useState } from "react";
import api from "../../services/api"



export default function SignUp() {

  const dataTemplate = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [userData, setUserData] = useState(dataTemplate);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  function uptadeInputsField(key, value) {
    setUserData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  const formComponents = [
    <UserDataForm
      userData={userData}
      uptadeInputsField={uptadeInputsField}
      nameError={nameError}
      emailError={emailError}
      key="0"
    />,
    <UserPasswordForm
      userData={userData}
      uptadeInputsField={uptadeInputsField}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      key="1" />,
    <SucessSignUp key="2" />,
  ];


  const { currentStep, currentComponent, changeStep } = useForm(formComponents);

  function handleContinueButton() {
    setEmailError("");
    setNameError("");
    if (!userData.name) {
      setNameError("O campo 'Nome' deve ser preenchido!");
      return
    }

    if (!userData.email) {
      setEmailError("O campo'E-mail' deve ser preenchido! ");
      return
    }
    if (!userData.email.includes("@") || !userData.email.includes(".com") || userData.email.indexOf("@") === email.length - 1) {
      setEmailError('O campo "email" deve ser um email válido');
      return;
    }

    changeStep(currentStep + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setPasswordError("");
      setConfirmPasswordError("");

      if (!userData.password) {
        setPasswordError("O campo 'Senha' deve ser preenchido!");
        return;
      }

      if (userData.password.length < 8) {
        setPasswordError('O campo "senha" deve ter no mínimo 8 caracteres!');
        return;
      }

      if (!userData.confirmPassword) {
        setConfirmPasswordError("O campo 'Repita sua senha' deve ser preenchido!");
        return;
      }

      if (userData.password !== userData.confirmPassword) {
        setConfirmPasswordError("As senhas deverão ser iguais!");
        return;
      }
      const response = await api.post('/sign-up', {
        name: userData.name,
        email: userData.email,
        password: userData.password
      });

      changeStep(currentStep + 1);
    } catch (error) {
      return error.message;
    }
  }

  function handleStepOneBtn() {
    if (currentStep === 2) {
      return;
    }
    changeStep(0);
  }


  return (
    <div className="container">
      <div className="steps-container">
        <Stepper currentStep={currentStep} />
      </div>
      <div className="form-container">
        <div className={currentStep !== 2 ? 'form-itens' : 'sucess-container'}>
          <div className='components-container'>
            {currentComponent}
          </div>
          {currentStep === 0 &&
            <div>
              <div className='btn-container'>
                <button
                  className="continue-btn"
                  type='button'
                  onClick={handleContinueButton}
                >
                  Continuar
                </button>
              </div>
              <p className='text-to-sign-in'>Já possui uma conta? Faça seu <Link to="/sign-in" className='link-to-sign-in'>Login</Link> </p>
            </div>
          }

          {
            currentStep === 1 &&
            <div>
              <div className='btn-container'>
                <button className='finish-btn' type='submit' onClick={handleSubmit}>Finalizar cadastro</button>
              </div>
              <p className='text-to-sign-in'>Já possui uma conta? Faça seu <Link className='link-to-sign-in' to="/sign-in">Login</Link> </p>
            </div>
          }
          <div className={currentStep !== 2 ? 'btns-container' : "btns-container-alternative"}>
            <div className='btn-stepper' >
              <img onClick={handleStepOneBtn} src={currentStep === 0 ? GreenRectangle : GrayRectangle} />
            </div>
            <div className='btn-stepper' >
              <img src={currentStep === 1 ? GreenRectangle : GrayRectangle} />
            </div>
            <div className='btn-stepper' >
              <img onClick={userData.name & userData.email & userData.password & userData.confirmPassword && changeStep(2)} src={currentStep === 2 ? GreenRectangle : GrayRectangle} />
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

