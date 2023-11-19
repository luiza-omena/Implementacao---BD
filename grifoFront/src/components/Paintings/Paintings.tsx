import { useContext, useEffect, useState } from "react";
import { Obra } from "../../types/Obra";
import "./Paintings.css";
import axios from "axios";
import LoginModal from "../Login/LoginModal";
import { HomeContext } from "../../context/HomeContext";

export const Paintings = () => {
  const { openUserCredentialsModal } = useContext(HomeContext)
  const [obras, setObras] = useState<Obra[]>([])

  useEffect(() => {
    async function fetchData() {
        try{
            const res = await axios.get("http://localhost:8080/obras")
            console.log(res)
            setObras(res.data)
        } catch(error){
            console.log(error)
        }
    }
    fetchData()
  }, [setObras])
      
  return (
    <div className="paintings">
      <div className="mt-10 paintings">
        <a className="text-[#DAA520] text-4xl font-Inter ml-20 cursor-default">Obras</a>
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