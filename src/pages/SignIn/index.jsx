import SignInForm from "../../components/SignInForm";
import "./style.css";

export default function SignIn() {
  return (
    <div className="sign-in-page">
      <div className="bg-sign-in">
        <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
      </div>
      <SignInForm />
    </div>
  )
}
