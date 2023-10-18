import {
  Routes,
  Route
} from "react-router-dom";
import Main from './pages/Main';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Clients from "./pages/Client";
import { getItem } from "./utils/storage";
import { Outlet, Navigate } from "react-router-dom";
import { ModalProvider } from "./contexts/modalContext";
import Charges from "./pages/Charges";
import { UserProvider } from "./contexts/userContext";
import { ChargeProvider } from "./contexts/chargeContext";

function PrivateRoutes({ redirectTo }) {
  const isAuthenticated = getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function MyRoutes() {
  return (
    <>
      <UserProvider>
        <ChargeProvider>
          <ModalProvider>
            <Routes>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route element={<PrivateRoutes redirectTo={"/sign-up"} />}>
                <Route path='/main' element={<Main />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/clients/status' element={<Clients />} />
                <Route path='/charges' element={<Charges />} />
                <Route path='charges/status' element={<Charges />} />
              </Route>
            </Routes>
          </ModalProvider>
        </ChargeProvider>
      </UserProvider>
    </>
  )
}
