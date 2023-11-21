import { HomeContext } from "../../context/HomeContext";
import "./Admin.css";
import LoginModal from "../Login/LoginModal";
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import PostObra from "../PostObraModal/PostObra";
import FuncionarioModal from "../PostFuncionario/PostFuncionario";

export const AdminPage = () => {
  const { openUserCredentialsModal, setPostObraModal, postObraModal, setFuncionarioModal, funcionarioModal } = useContext(HomeContext)
  const navigate = useNavigate();

  const handlePost = () => {
    setPostObraModal(true);
  }

  const handlePostFuncionario = () => {
    setFuncionarioModal(true);
  }

  useEffect(() => {
    if (openUserCredentialsModal) {
      {openUserCredentialsModal && <LoginModal/>}
    }
  }, [openUserCredentialsModal]);
  return (
    <>  
      <div className="mt-16 adm flex">
          <a className="text-[#DAA520] text-5xl font-Inter ml-20 cursor-default">Gerenciamento</a>
      </div>
      <div className="flex flex-col items-start mt-10">
          <span className="text-grey1 font-semibold text-2xl font-Inter ml-20 cursor-default">Obras:</span>
          <button className="ml-32 mt-2 font-Inter font-medium text-xl hover:text-[#DAA520]" onClick={() => navigate('/obras')}>Ver Obras</button>
          <div onClick={handlePost} className="ml-32 mt-2 flex justify-between items-center w-32 font-Inter bg-grey1 rounded-lg border border-grey1 hover:bg-[#DAA520]">
            <PlusOutlined style={{color: "grey1", marginLeft:"18px", fontSize:"20px"}}/>
            <button className="text-xl font-Inter mr-8">Obra</button>
        </div>
      </div>
      {funcionarioModal && <FuncionarioModal/>}
      <div className="flex flex-col items-start mt-10">
          <span className="text-grey1 font-semibold text-2xl font-Inter ml-20 cursor-default">Funcionários:</span>
          <button className="ml-32 mt-2 font-Inter font-medium text-xl hover:text-[#DAA520]" onClick={() => navigate('/funcionarios')}>Ver Funcionários</button>
          <div onClick={handlePostFuncionario} className="ml-32 mt-2 flex justify-between items-center w-40 font-Inter bg-grey1 rounded-lg border border-grey1 hover:bg-[#DAA520]">
            <PlusOutlined style={{color: "grey1", marginLeft:"18px", fontSize:"20px"}}/>
            <button className="text-xl font-Inter mr-8">Funcionário</button>
          </div>
      </div>
      {postObraModal && <PostObra/>}
    </>
  );
};