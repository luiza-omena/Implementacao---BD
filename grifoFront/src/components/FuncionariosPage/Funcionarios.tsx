import { useContext, useEffect, useState } from "react";
import LoginModal from "../Login/LoginModal";
import { HomeContext } from "../../context/HomeContext";
import { Api } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import PostObra from "../PostObraModal/PostObra";
import { Funcionario } from "../../types/Funcionario";

export const Funcionarios = () => {
  const { openUserCredentialsModal, setPostObraModal, postObraModal } = useContext(HomeContext)
  const [funcionarios, setfuncionarios] = useState<Funcionario[]>([])
  const auth = useAuth();

  const handlePost = () => {
    setPostObraModal(true);
  }

  useEffect(() => {
    async function fetchData() {
        try{
            const response = Api.get("funcionarios");
            setfuncionarios((await response).data)
        } catch(error){
            console.log(error)
        }
    }
    fetchData()
  }, [setfuncionarios])
      
  return (
    <div className="paintings">
      <div className="mt-10 paintings flex flex-row justify-between">
        <a className="text-[#DAA520] text-4xl font-Inter ml-20 cursor-default">Funcionários</a>
        {auth.email && 
        <div onClick={handlePost} className="mr-20 mt-2 flex justify-between items-center w-40 font-Inter bg-grey1 rounded-lg border border-grey1 hover:bg-[#DAA520]">
            <PlusOutlined style={{color: "grey1", marginLeft:"18px", fontSize:"20px"}}/>
            <button className="text-xl font-Inter mr-8">Funcionário</button>
        </div>
        }
        {postObraModal && <PostObra/>}
      </div>
        
      <div className="place-items-center grid grid-cols-4">
        {funcionarios.map((funcionario) => (
          <div className="mt-10 mb-2 mx-5 w-80 cursor-default" key={funcionario.id_funcionario}>
            <div className="flex-col justify-center">
              <div className="flex flex-row justify-between bg-[#DAA520] rounded-lg h-fit">
                <div className="flex flex-col justify-between ml-[10%]">
                  <h1 className="font-Inter text-lg font-semibold">{funcionario.nome}</h1>
                  <h2 className="font-Inter text-md font-medium">{funcionario.email}</h2>
                </div>
                <DeleteFilled style={{fontSize:"18px", marginTop:"1rem", marginRight:"15%"}} onClick={() => null}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openUserCredentialsModal && <LoginModal/>}
    </div>
  );
};