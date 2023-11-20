import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import { FichaTecnica } from "../../types/FichaTecnica";
import { Api } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import LoginModal from "../Login/LoginModal";
import { useParams } from "react-router-dom";
import PostFicha from "../PostFichaTecnica/PostFicha";

export const FichaTecnicaPage = () => {
    const { id } = useParams();
    const {openUserCredentialsModal, setPostFichaModal, postFichaModal} = useContext(HomeContext)
    const [ficha, setFicha] = useState<FichaTecnica[]>([])
    const [createFicha, setCreateFicha] = useState<boolean>(false)
    const auth = useAuth();
  
    useEffect(() => {
      async function fetchData() {
          try{
              const response = await Api.get(`fichaTecnica/${id}`);
              console.log(response)
              setFicha(response.data)
              setCreateFicha(false);
          } catch(error){
              console.log(error)
              if (error instanceof Error) {
                // Verifica se a propriedade 'response' existe
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
          {auth.email && !createFicha &&
          <div onClick={() => null} className="mr-20 mt-2 flex justify-between items-center w-32 font-Inter bg-grey1 rounded-lg border border-grey1 hover:bg-[#DAA520]">
              <EditOutlined style={{color: "grey1", marginLeft:"18px", fontSize:"20px"}}/>
              <button className="text-xl font-Inter mr-8">Editar Ficha</button>
          </div>
          }
        </div>
          
        { createFicha ?
        <div>
          <a>A obra ainda não possui uma ficha técnica</a>
          {auth.email && 
          <div>
            <PlusOutlined onClick={() => setPostFichaModal(true)}/>
            <button className="" onClick={() => setPostFichaModal(true)}>Adicionar</button>
          </div>}
        </div>
        :       
        <div className="place-items-center grid grid-cols-3">
          {ficha.map((ficha) => (
            <div className="mt-10 mb-2 mx-5 w-80" key={ficha.cod_ficha}>
              <div className="flex-col justify-between">
                <div className="mb-8">
                  <h1 className="font-Inter text-lg font-semibold">Descrição:</h1>
                  <a className="font-Inter text-md font-medium" >{ficha.descricao}</a>
                </div>
                <div className="mb-8">
                    <h1 className="font-Inter text-lg font-semibold">Técnica de Restauração:</h1>
                    <a className="font-Inter text-md font-medium" >{ficha.tecnica_restauracao}</a>
                </div>
                <div className="mb-8">
                    <h1 className="font-Inter text-lg font-semibold">Análise:</h1>
                    <a className="font-Inter text-md font-medium" >{ficha.analise}</a>
                </div>
                <div className="mb-8">
                    <h1 className="font-Inter text-lg font-semibold">Data do início da obra:</h1>
                    <a className="font-Inter text-md font-medium" >{(ficha.data_inicio_obra).toString()}</a>
                </div>
                <div className="mb-8">
                    <h1 className="font-Inter text-lg font-semibold">Data do término da obra:</h1>
                    <a className="font-Inter text-md font-medium" >{(ficha.data_termino_obra).toString()}</a>
                </div>
                <div className="mb-8">
                    <h1 className="font-Inter text-lg font-semibold">Empresa Prestadora de serviço:</h1>
                    <a className="font-Inter text-md font-medium" >{ficha.empresa_prestadora_de_servico}</a>
                </div>
                </div>
            </div>
          ))}
        </div>}
        {openUserCredentialsModal && <LoginModal/>}
        {postFichaModal && <PostFicha/>}
      </div>
    );
  };