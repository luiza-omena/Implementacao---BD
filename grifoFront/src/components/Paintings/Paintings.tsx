import { useContext, useEffect, useState } from "react";
import { Obra } from "../../types/Obra";
import "./Paintings.css";
import LoginModal from "../Login/LoginModal";
import { HomeContext } from "../../context/HomeContext";
import { Api } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import PostObra from "../PostObraModal/PostObra";

export const Paintings = () => {
  const { openUserCredentialsModal, setPostObraModal, postObraModal } = useContext(HomeContext)
  const [obras, setObras] = useState<Obra[]>([])
  const auth = useAuth();

  const handlePost = () => {
    setPostObraModal(true);
}

  useEffect(() => {
    async function fetchData() {
        try{
            const response = Api.get("obras");
            setObras((await response).data)
        } catch(error){
            console.log(error)
        }
    }
    fetchData()
  }, [setObras])
      
  return (
    <div className="paintings">
      <div className="mt-10 paintings flex flex-row justify-between">
        <a className="text-[#DAA520] text-4xl font-Inter ml-20 cursor-default">Obras</a>
        {auth.email && 
        <div onClick={handlePost} className="mr-20 mt-2 flex justify-between items-center w-32 font-Inter bg-grey1 rounded-lg border border-grey1 hover:bg-[#DAA520]">
            <PlusOutlined style={{color: "grey1", marginLeft:"18px", fontSize:"20px"}}/>
            <button className="text-xl font-Inter mr-8">Obra</button>
        </div>
        }
        {postObraModal && <PostObra/>}
      </div>
        
      <div className="place-items-center grid grid-cols-3">
        {obras.map((obra) => (
          <div className="mt-10 mb-2 mx-5 w-80" key={obra.id_obra}>
            <div className="flex-col justify-center">
              <div className="rounded-t-lg overflow-hidden">
                <img
                  className="object-cover object-center w-full h-[400px]"
                  src={obra.img}
                  alt={obra.nome}
                />
              </div>
              <div className="flex flex-col justify-between items-center bg-[#DAA520] rounded-b-lg h-fit">
                <h1 className="font-Inter text-lg font-semibold">{obra.nome}</h1>
                <h2 className="font-Inter text-md font-medium">{obra.artista_original}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openUserCredentialsModal && <LoginModal/>}
    </div>
  );
};