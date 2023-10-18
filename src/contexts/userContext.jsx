
import { createContext } from "react";
import useCreateUserValues from "../hooks/useCreateUserValues";

export const UserContext = createContext();

export function UserProvider(props) {
  const userValues = useCreateUserValues();

  return (
    <UserContext.Provider value={ userValues }>
      {props.children}
    </UserContext.Provider>
  );
}