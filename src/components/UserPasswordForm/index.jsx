import './style.css';
import { useState } from 'react';
import Eye from '../../assets/eye.png';
import EyeOff from '../../assets/eye-off.png';



export default function UserPasswordForm({ userData, uptadeInputsField, passwordError, confirmPasswordError }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div>
      <h1 className='title-user-password'>Escolha uma senha</h1>
      <form className='user-form '>
        <label className='user-label' htmlFor="password">Senha*</label>
        <div className='user-input-container'>
          <input
            className='user-input'
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder='Digite sua senha'
            value={userData.password || ""}
            onChange={(e) => uptadeInputsField("password", e.target.value)}
            required
          />
          <img className='eye-icon' src={showPassword ? EyeOff : Eye} onClick={() => setShowPassword(!showPassword)} />
        </div>
        {passwordError &&
          <p className='error-message'>{passwordError}</p>
        }

        <label className='user-label' htmlFor="confitm-password">Repita sua senha*</label>
        <div className='user-input-container'>
          <input
            className='user-input'
            type={showConfirmPassword ? "text" : "password"}
            name="confirm-password"
            id="confirm-password"
            placeholder='Repita a sua senha'
            value={userData.confirmPassword || ""}
            onChange={(e) => { uptadeInputsField("confirmPassword", e.target.value) }}
            required
          />
          <img className='eye-icon' src={showConfirmPassword ? EyeOff : Eye} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
        </div>
        {confirmPasswordError &&
          <p className='error-message'>{confirmPasswordError}</p>
        }

      </form>
    </div>
  )
}