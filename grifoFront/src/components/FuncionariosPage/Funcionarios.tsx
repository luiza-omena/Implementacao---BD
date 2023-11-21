import { useContext, useEffect, useState } from "react";
import LoginModal from "../Login/LoginModal";
import { HomeContext } from "../../context/HomeContext";
import { Api } from "../../hooks/useApi";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { Funcionario } from "../../types/Funcionario";
import FuncionarioModal from "../PostFuncionario/PostFuncionario";

export const Funcionarios = () => {
  const { openUserCredentialsModal, setFuncionarioModal, funcionarioModal } = useContext(HomeContext)
  const [funcionarios, setfuncionarios] = useState<Funcionario[]>([])

  const handlePost = () => {
    setFuncionarioModal(true);
  }

  async function deleteFuncionario(id: number | null) {
    try {
      const response = await Api.delete(`delete-funcionario/${id}`);
      console.log(response.data);
      setTimeout(function() {
        location.reload();
      }, 100);
    } catch (error) {
      console.error(error);
    }
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
        <div onClick={handlePost} className="mr-20 mt-2 flex justify-between items-center w-40 font-Inter bg-grey1 rounded-lg border border-grey1 hover:bg-[#DAA520]">
            <PlusOutlined style={{color: "grey1", marginLeft:"18px", fontSize:"20px"}}/>
            <button className="text-xl font-Inter mr-8">Funcionário</button>
        </div>
      </div>
        {funcionarioModal && <FuncionarioModal/>}
      <div className="place-items-center grid grid-cols-4">
        {funcionarios.map((funcionario) => (
          <div className="mt-10 mb-2 mx-5 w-80 cursor-default" key={funcionario.id_funcionario}>
            <div className="flex-col justify-center">
              <div className="flex flex-row justify-between bg-[#DAA520] rounded-lg h-fit">
                <div className="flex flex-col justify-between ml-[10%]">
                  <h1 className="font-Inter text-lg font-semibold">{funcionario.nome}</h1>
                  <h2 className="font-Inter text-md font-medium">{funcionario.email}</h2>
                </div>
                <DeleteFilled style={{fontSize:"18px", marginTop:"1rem", marginRight:"15%"}} onClick={() => deleteFuncionario(funcionario.id_funcionario)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openUserCredentialsModal && <LoginModal/>}
    </div>
  );
};