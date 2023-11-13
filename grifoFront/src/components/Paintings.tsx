import { useContext } from "react";
import { HomeContext } from "../context/HomeContext";
import { Obra } from "../types/Obra";
import "./Paintings.css";

export const Paintings = () => {
    const obras: Obra[] = [
        {
          image: "caminho-para-a-imagem-1.jpg",
          id: 1,
          name: "Mona Lisa",
          artist: "Leonardo da Vinci",
          artistic_era: "Renascimento",
          dimensions: "77 cm x 53 cm",
        },
        {
          image: "caminho-para-a-imagem-2.jpg",
          id: 2,
          name: "A Noite Estrelada",
          artist: "Vincent van Gogh",
          artistic_era: "Pós-Impressionismo",
          dimensions: "73.7 cm x 92.1 cm",
        },
        {
          image: "caminho-para-a-imagem-3.jpg",
          id: 3,
          name: "O Grito",
          artist: "Edvard Munch",
          artistic_era: "Simbolismo",
          dimensions: "83.5 cm x 66 cm",
        },
        {
            image: "caminho-para-a-imagem-3.jpg",
            id: 4,
            name: "O Grito",
            artist: "Edvard Munch",
            artistic_era: "Simbolismo",
            dimensions: "83.5 cm x 66 cm",
          },
          {
            image: "caminho-para-a-imagem-3.jpg",
            id: 5,
            name: "O Grito",
            artist: "Edvard Munch",
            artistic_era: "Simbolismo",
            dimensions: "83.5 cm x 66 cm",
          },
          {
            image: "caminho-para-a-imagem-3.jpg",
            id: 6,
            name: "O Grito",
            artist: "Edvard Munch",
            artistic_era: "Simbolismo",
            dimensions: "83.5 cm x 66 cm",
          },
          {
            image: "caminho-para-a-imagem-3.jpg",
            id: 7,
            name: "O Grito",
            artist: "Edvard Munch",
            artistic_era: "Simbolismo",
            dimensions: "83.5 cm x 66 cm",
          },
      ];
      
    return (
        <div className="place-items-center grid grid-cols-3">
        {obras.map((obra) => (
                <div className="mt-20 mb-2 rounded-t-lg" key={obra.id}>
                    <div className="flex-col justify-center">
                        <img className="h-[400px] rounded-t-lg" src={'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQ-FvbbAq5IaJUhtwxXEwY0D-jiZju02ejnNHx_bQWL_27GF3srhwJgqusMAqKh3QqU'} />
                        <div className="flex flex-col justify-center items-center bg-[#DAA520] rounded-b-lg h-14">
                            <h1 className="font-Inter text-lg font-semibold">{obra.name}</h1>
                            <h2 className="font-Inter text-md font-medium">{obra.artist}</h2>
                        </div>
                    </div>
                </div>
        ))}
        </div>
    );
};