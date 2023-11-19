import { Button } from "antd";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../context/HomeContext";
import LoginModal from "../Login/LoginModal";

export const ProtectedLayout = ({children}: {children: JSX.Element}) => {
    const { setOpenUserCredentialsModal, openUserCredentialsModal} = useContext(HomeContext)
	const handleClick = async () => {
        setOpenUserCredentialsModal(true);
	};
    const auth = useAuth();

    useEffect(() => {
        setOpenUserCredentialsModal(false)
    }, [])
    
    if (!auth.email) {
        return (
            <div>
                <h1 className="mt-10 ml-10 font-Inter font-semibold text-2xl">ERRO: Você não tem acesso a essa página
                    tente fazer login:</h1>
                <Button onClick={handleClick} className="mt-6 ml-10 w-20 text-16 font-Inter"> Login </Button>
                {openUserCredentialsModal && <LoginModal/>}
            </div>
        );
    }

    return children;
}