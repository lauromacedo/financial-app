import "./style.css";
import iconEyeOff from "../../assets/eye-off.png";
import iconEye from "../../assets/eye.png";
import closeIcon from "../../assets/close.png";
import useModal from "./../../hooks/useModal";
import { getItem } from "./../../utils/storage";
import { useState } from "react";
import api from "../../services/api";
import iconChecked from "../../assets/checked.svg";
import useUser from "../../hooks/useUser";

export default function EditUserModal() {
  const { setOpenEditModal } = useModal();

  const { currentUser, renderUser, setRenderUser } = useUser();

  const token = getItem("token");

  const [user, setUser] = useState({
    name: currentUser.user_name,
    email: currentUser.email,
    cpf: currentUser.cpf,
    phone: currentUser.phone,
    password: "",
    confirmPassword: "",
  });

  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function handleChangeInput(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleShowPassword() {
    setPasswordVisible(!passwordVisible);
  }

  function handleShowConfirmPassword() {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  }

  async function handleUpdateUser(e) {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setCpfError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!user.name) {
      setNameError("Este campo deve ser preenchido");
      return;
    }

    if (!user.email) {
      setEmailError("Este campo deve ser preenchido");
      return;
    }

    if (
      !user.email.includes("@") ||
      user.email.indexOf("@") === user.email.length - 1
    ) {
      setEmailError('O campo "email" deve ser um email válido');
      return;
    }

    if (user.cpf) {
      if (user.cpf.length !== 11) {
        setCpfError('O campo "CPF" deve ter 11 caracteres');
        return;
      }
    }

    if (user.phone) {
      if (user.phone.length !== 10 && user.phone.length !== 11) {
        setPhoneError('O campo "telefone" deve ter 10 ou 11 caracteres');
        return;
      }
    }

    if (user.password) {
      if (user.password.length < 8) {
        setPasswordError('O campo "senha" deve ter no mínimo 8 caracteres');
        return;
      }
    }

    if (user.confirmPassword) {
      if (user.confirmPassword.length < 8) {
        setConfirmPasswordError(
          'O campo "senha" deve ter no mínimo 8 caracteres'
        );
        return;
      }
    }

    if (user.password || user.confirmPassword) {
      if (user.password !== user.confirmPassword) {
        setConfirmPasswordError("As senhas não coincidem");
        return;
      }
    }

    try {
      const { confirmPassword: _, ...subfields } = user;

      if (subfields.password) {
        await api.put(
          "/user",
          {
            ...subfields
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await api.put(
          "/user",
          {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone: user.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setRenderUser(!renderUser);

      setIsUserUpdated(true);
    } catch (error) {
      setEmailError(error.response.data.mensagem);
    }
  }

  return (
    <>
      {!isUserUpdated ? (
        <div className="modal">
          <div className="modal-content">
            <header>
              <h1>Edite seu cadastro</h1>
            </header>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label htmlFor="name">
                  Nome<sup>*</sup>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Digite seu nome"
                  value={user.name}
                  onChange={handleChangeInput}
                />
                <p className="error-message">{nameError}</p>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email<sup>*</sup>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={user.email}
                  onChange={handleChangeInput}
                />
                <p className="error-message">{emailError}</p>
              </div>
              <div className="form-group-mixed">
                <div className="cpf">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    className="form-control-cpf"
                    id="cpf"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    value={user.cpf}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="phone">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    className="form-control-phone"
                    id="phone"
                    name="phone"
                    placeholder="Digite seu Telefone"
                    value={user.phone}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <p className="error-message">
                {cpfError ? cpfError : phoneError}
              </p>
              <div className="form-group">
                <label htmlFor="password">
                  Nova Senha<sup>*</sup>
                </label>
                <div className="password">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={user.password}
                    onChange={handleChangeInput}
                  />
                  <img
                    className="eyes-icon"
                    src={passwordVisible ? iconEye : iconEyeOff}
                    alt="Ícone de um olho com um traço simbolizando esconder senha"
                    onClick={handleShowPassword}
                  />
                </div>
                <p className="error-message">{passwordError}</p>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">
                  Confirmar Senha <sup>*</sup>
                </label>
                <div className="password">
                  <input
                    type={passwordConfirmVisible ? "text" : "password"}
                    className="form-control"
                    id="confirm-password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    value={user.confirmPassword}
                    onChange={handleChangeInput}
                  />
                  <img
                    className="eyes-icon"
                    src={passwordConfirmVisible ? iconEye : iconEyeOff}
                    alt="Ícone de um olho com um traço simbolizando esconder senha"
                    onClick={handleShowConfirmPassword}
                  />
                </div>
                <p className="error-message">{confirmPasswordError}</p>
              </div>
              <button className="apply-btn" type="submit">
                Aplicar
              </button>
            </form>
            <img
              src={closeIcon}
              alt="Ícone para fechar formulário de edição do usuário"
              className="close-icon"
              onClick={() => setOpenEditModal(false)}
            />
          </div>
        </div>
      ) : (
        <div className="modal" onClick={() => setOpenEditModal(false)}>
          <div className="modal-content-finished">
            <img src={iconChecked} alt="Ícone verde em círculo com um símbolo de checagem concluída" />
            <h1>Cadastro Alterado com sucesso!</h1>
          </div>
        </div>
      )}
    </>
  );
}
