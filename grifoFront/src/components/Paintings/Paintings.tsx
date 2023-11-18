import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import { Obra } from "../../types/Obra";
import "./Paintings.css";
import axios from "axios";

export const Paintings = () => {
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
    <div className="place-items-center grid grid-cols-3">
      {obras.map((obra) => (
        <div className="mt-20 mb-2 mx-5 rounded-t-lg w-80" key={obra.id_obra}>
          <div className="flex-col justify-center">
            <img
              className="rounded-t-lg object-cover"
              src={'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQ-FvbbAq5IaJUhtwxXEwY0D-jiZju02ejnNHx_bQWL_27GF3srhwJgqusMAqKh3QqU'}
              alt={obra.nome}
            />
            <div className="flex flex-col justify-between items-center bg-[#DAA520] rounded-b-lg h-fit">
              <h1 className="font-Inter text-lg font-semibold">{obra.nome}</h1>
              <h2 className="font-Inter text-md font-medium">{obra.artista_original}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};