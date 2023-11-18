import { HomeContext } from "../../context/HomeContext";
import "./LandingPage.css";
import LoginModal from "../Login/LoginModal";
import { useContext, useEffect } from 'react';

export const LandingPage = () => {
  const { openUserCredentialsModal } = useContext(HomeContext)
  useEffect(() => {
    if (openUserCredentialsModal) {
      {openUserCredentialsModal && <LoginModal/>}
    }
  }, [openUserCredentialsModal]);
  return (
    <div className="landing h-80 flex justify-center">
        <a className="text-grey1 text-4xl font-Inter font-bold mt-32 cursor-default"> Grifo Diagnóstico e Conservação de Bens Culturais </a>
    </div>
  );
};