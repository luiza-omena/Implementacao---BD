import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import { FichaTecnica } from "../../types/FichaTecnica";
import { Api } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import LoginModal from "../Login/LoginModal";
import { useParams } from "react-router-dom";
import PostFicha from "../PostFichaTecnica/PostFicha";
import FichaEdit from "../EditFichaModal/FichaEdit";

export const FichaTecnicaPage = () => {
    const obraId  = useParams();
    const {openUserCredentialsModal, setPostFichaModal, postFichaModal, setUpdateModal, updateModal} = useContext(HomeContext)
    const [ficha, setFicha] = useState<FichaTecnica[]>([])
    const [createFicha, setCreateFicha] = useState<boolean>(false)
    const [campo, setCampo] = useState<string>("")
    const auth = useAuth();
  
    const handleClick = () => {
        setUpdateModal(true);
    };

    useEffect(() => {
      async function fetchData() {
          try{
              const response = await Api.get(`fichaTecnica/${obraId['id']}`);
              console.log(response)
              setFicha(response.data)
              setCreateFicha(false);
          } catch(error){
              console.log(error)
              if (error instanceof Error) {
                const errorWithResponse = error as { response?: { status?: number } };
                if (errorWithResponse.response && errorWithResponse.response.status === 400) {
                    setCreateFicha(true);
                }
            }
          }
      }
      fetchData()
    }, [setFicha])
        
    return (
      <div className="">
        <div className="mt-10 paintings flex flex-row justify-between">
          <a className="text-[#DAA520] text-4xl font-Inter ml-20 cursor-default">Ficha Técnica</a>
        </div>
          
        { createFicha ?
        <div className="mt-10">
          <a className="font-Inter font-semibold text-2xl ml-20 text-grey1">A obra ainda não possui uma ficha técnica</a>
          {auth.email && 
          <div className="px-3 w-fit rounded-full border-2 border-[#DAA520] text-[#DAA520] flex justify-center font-semibold text-xl font-Inter mt-4 ml-20">
            <PlusOutlined className='mt-1' onClick={() => setPostFichaModal(true)}/>
            <button className="ml-2" onClick={() => setPostFichaModal(true)}>Adicionar Ficha</button>
          </div>}
        </div>
        :       
        <div className="place-items-center grid grid-cols-3">
          {ficha.map((ficha) => (
            <div className="mt-10 mb-2 mx-5 w-80" key={ficha.cod_ficha}>
              <div className="flex-col justify-between">
                <div className="mb-8">
                  {auth.email && !createFicha ?
                    <div className="flex flex-row">
                      <button onClick={() => {handleClick(); setCampo("Descrição");}} className="flex justify-between items-center w-6 font-Inter bg-grey1 hover:text-[#DAA520]">
                      <EditOutlined style={{color: "grey1", fontSize:"20px"}}/>
                      </button>
                      <h1 className="font-Inter text-lg font-semibold">Descrição:</h1>
                    </div>
                    :
                    <h1 className="font-Inter text-lg font-semibold">Descrição:</h1>
                  }
                  <a className="font-Inter text-md font-medium" >{ficha.descricao}</a>
                </div>
                <div className="mb-8">
                {auth.email && !createFicha ?
                    <div className="flex flex-row">
                      <button onClick={() => {handleClick(); setCampo("Técnica de Restauração");}} className="flex justify-between items-center w-6 font-Inter bg-grey1 hover:text-[#DAA520]">
                      <EditOutlined style={{color: "grey1", fontSize:"20px"}}/>
                      </button>
                      <h1 className="font-Inter text-lg font-semibold">Técnica de Restauração:</h1>
                    </div>
                    :
                    <h1 className="font-Inter text-lg font-semibold">Técnica de Restauração:</h1>
                  }                   
                    <a className="font-Inter text-md font-medium" >{ficha.tecnica_restauracao}</a>
                </div>
                <div className="mb-8">
                  {auth.email && !createFicha ?
                      <div className="flex flex-row">
                        <button onClick={() => {handleClick(); setCampo("Análise");}} className="flex justify-between items-center w-6 font-Inter bg-grey1 hover:text-[#DAA520]">
                        <EditOutlined style={{color: "grey1", fontSize:"20px"}}/>
                        </button>
                        <h1 className="font-Inter text-lg font-semibold">Análise:</h1>
                      </div>
                      :
                      <h1 className="font-Inter text-lg font-semibold">Análise:</h1>
                    }
                    <a className="font-Inter text-md font-medium" >{ficha.analise}</a>
                </div>
                <div className="mb-8">
                {auth.email && !createFicha ?
                    <div className="flex flex-row">
                      <button onClick={() => {handleClick(); setCampo("Data do início da obra");}} className="flex justify-between items-center w-6 font-Inter bg-grey1 hover:text-[#DAA520]">
                      <EditOutlined style={{color: "grey1", fontSize:"20px"}}/>
                      </button>
                      <h1 className="font-Inter text-lg font-semibold">Data do início da obra:</h1>
                    </div>
                    :
                    <h1 className="font-Inter text-lg font-semibold">Data do início da obra:</h1>
                  }
                    <a className="font-Inter text-md font-medium" >{(ficha.data_inicio_obra).toString()}</a>
                </div>
                <div className="mb-8">
                {auth.email && !createFicha ?
                    <div className="flex flex-row">
                      <button onClick={() => {handleClick(); setCampo("Data do término da obra");}} className="flex justify-between items-center w-6 font-Inter bg-grey1 hover:text-[#DAA520]">
                      <EditOutlined style={{color: "grey1", fontSize:"20px"}}/>
                      </button>
                      <h1 className="font-Inter text-lg font-semibold">Data do término da obra:</h1>
                    </div>
                    :
                    <h1 className="font-Inter text-lg font-semibold">Data do término da obra:</h1>
                  }
                    <a className="font-Inter text-md font-medium" >{(ficha.data_termino_obra).toString()}</a>
                </div>
                <div className="mb-8">
                {auth.email && !createFicha ?
                    <div className="flex flex-row">
                      <button onClick={() => {handleClick(); setCampo("Empresa Prestadora de serviço");}} className="flex justify-between items-center w-6 font-Inter bg-grey1 hover:text-[#DAA520]">
                      <EditOutlined style={{color: "grey1", fontSize:"20px"}}/>
                      </button>
                      <h1 className="font-Inter text-lg font-semibold">Empresa Prestadora de serviço:</h1>
                    </div>
                    :
                    <h1 className="font-Inter text-lg font-semibold">Empresa Prestadora de serviço:</h1>
                  }
                    <a className="font-Inter text-md font-medium" >{ficha.empresa_prestadora_de_servico}</a>
                </div>
                </div>
            </div>
          ))}
        </div>}
        {openUserCredentialsModal && <LoginModal/>}
        {postFichaModal && <PostFicha/>}
        {updateModal && <FichaEdit idObra={Number(obraId['id'])} campo={campo}/>}
      </div>
    );
  };