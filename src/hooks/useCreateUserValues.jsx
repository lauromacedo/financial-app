import { useState } from "react";


export default function useCreateModalValues() {
  const [currentUser, setCurrentUser] = useState({
    user_name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [renderUser, setRenderUser] = useState(false);

  return {
    currentUser,
    setCurrentUser,
    renderUser,
    setRenderUser
  };
}