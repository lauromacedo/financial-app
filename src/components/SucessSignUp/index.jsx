import './style.css';
import Checked from '../../assets/checked.svg';
import { useNavigate } from 'react-router-dom';

export default function SucessSignUp() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='sucess'>
        <div className='sucess-container'>
          <img className='sucess-img' src={Checked} alt='Tarefa concluída' />
          <h1 className='sucess-text'>Cadastro realizado com sucesso!</h1>
        </div>
        <button className='sucess-btn' onClick={() => navigate("/sign-in")}>Ir para Login</button>
      </div>

    </div>
  )
}