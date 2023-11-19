import { HomeContext } from "../../context/HomeContext";
import "./Admin.css";
import LoginModal from "../Login/LoginModal";
import { useContext, useEffect } from 'react';
import { AuthContext } from "../../context/AuthProvider";

export const AdminPage = () => {
  const { openUserCredentialsModal } = useContext(HomeContext)
  const {logout} = useContext(AuthContext)
  useEffect(() => {
    if (openUserCredentialsModal) {
      {openUserCredentialsModal && <LoginModal/>}
    }
  }, [openUserCredentialsModal]);
  return (
    <div className="landing h-80 flex justify-center">
        <a className="text-grey1 text-4xl font-Inter font-bold mt-32 cursor-default"> Grifo Diagnóstico e Conservação de Bens Culturais </a>
        <div>
            <button onClick={() => logout()}>sair</button>
        </div>
    </div>
  );
};