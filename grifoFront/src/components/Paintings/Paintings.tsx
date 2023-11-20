import { useContext, useEffect, useState } from "react";
import { Obra } from "../../types/Obra";
import "./Paintings.css";
import LoginModal from "../Login/LoginModal";
import { HomeContext } from "../../context/HomeContext";
import { Api } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import PostObra from "../PostObraModal/PostObra";
import { useNavigate } from "react-router-dom";
import BemMovel from "../BensModal/BensMoveis";
import BemImovel from "../BensModal/BensImoveis";

export const Paintings = () => {
  const { openUserCredentialsModal, setPostObraModal, postObraModal, setObraId, bemImovel, bemMovel, newObra } = useContext(HomeContext)
  const [obras, setObras] = useState<Obra[]>([])
  const auth = useAuth();
  const navigate = useNavigate();

  const handlePost = () => {
    setPostObraModal(true);
  }

  async function deleteObra(obraId: number | null) {
    try {
      const response = await Api.delete(`delete-obra/${obraId}`);
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
          <div className="mt-10 mb-2 mx-5 w-80 cursor-pointer" key={obra.id_obra}>
            <div className="flex-col justify-center">
              <div className="rounded-t-lg overflow-hidden"  onClick={() => { setObraId(obra.id_obra); navigate(`/fichaTecnica/${obra.id_obra}`); }}>
                <img
                  className="object-cover object-center w-full h-[400px]"
                  src={obra.img}
                  alt={obra.nome}
                />
              </div>
              <div className="flex flex-row justify-between bg-[#DAA520] rounded-b-lg h-fit">
                <div className="flex flex-col justify-between ml-[10%]"  onClick={() => { setObraId(obra.id_obra); navigate(`/fichaTecnica/${obra.id_obra}`); }}>
                  <h1 className="font-Inter text-lg font-semibold">{obra.nome}</h1>
                  <h2 className="font-Inter text-md font-medium">{obra.artista_original}</h2>
                </div>
                <DeleteFilled style={{fontSize:"18px", marginTop:"5%", marginRight:"15%"}} onClick={() => deleteObra(obra.id_obra)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openUserCredentialsModal && <LoginModal/>}
      {bemImovel && <BemImovel values={newObra} obraMovel={bemMovel}/>}
      {bemMovel && <BemMovel values={newObra} obraMovel={bemMovel}/>}
    </div>
  );
};