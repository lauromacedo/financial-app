import { useState } from "react";
import "./style.css";
import api from "../../services/api";
import { setItem } from "../../utils/storage";
import eyeOff from "../../assets/eye-off.png";
import eye from "../../assets/eye.png";

import { Link, useNavigate } from "react-router-dom";

export default function SignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [validCredentials, setValidCredentials] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();

    setValidCredentials("");
    setErrorEmail("");
    setErrorPassword("");

    if (!email) {
      setErrorEmail('O campo "email" é obrigatório');
      return;
    }

    if (!email.includes("@") || email.indexOf("@") === email.length - 1) {
      setErrorEmail('O campo "email" deve ser um email válido');
      return;
    }

    if (!password) {
      setErrorPassword('O campo "senha" é obrigatório');
      return;
    }

    if (password.length < 8) {
      setErrorPassword('O campo "senha" deve ter no mínimo 8 caracteres');
      return;
    }

    try {
      const response = await api.post("/sign-in", {
        email,
        password
      });

      const { token } = response.data;

      setItem("token", token);

      navigate("/main");
    } catch (error) {
      setValidCredentials(error.response.data.mensagem);
    }
  }

  return (
    <form method="POST" onSubmit={handleSignIn}>
      <h2>Faça seu login!</h2>
      <label htmlFor="email">E-mail</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span className="error-message">{errorEmail}</span>
      <div className="password-title-container">
        <label htmlFor="password">Password</label>
        <span>Esqueceu a senha?</span>
      </div>
      <div className="user-password">
        <input
          type={showLoginPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          src={showLoginPassword ? eye : eyeOff}
          alt="Ícone de olho para esconder ou mostrar a senha"
          onClick={() => setShowLoginPassword(!showLoginPassword)}

        />
      </div>
      <span className="error-message">{errorPassword ? errorPassword : validCredentials}</span>
      <button className="sign-in-btn" type="submit">Entrar</button>
      <p>Ainda não possui uma conta? <Link className="link-sign-up" to="/sign-up">Cadastre-se</Link></p>
    </form>
  )
}