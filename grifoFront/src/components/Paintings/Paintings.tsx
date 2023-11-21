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
import { FilterTag, SearchInput } from "../Filter/Filter";
import Checkbox from "../Filter/CheckBox";

export const Paintings = () => {
  const { openUserCredentialsModal, setPostObraModal, postObraModal, setObraId, bemImovel, bemMovel, newObra } = useContext(HomeContext)
  const [obras, setObras] = useState<Obra[]>([])
  const [ activeFilters, setActiveFilters ] = useState<string[]>([])
  const auth = useAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [isCheckedMovel, setIsCheckedMovel] = useState(false);
  const [isCheckedImovel, setIsCheckedImovel] = useState(false);

  const handleCheckboxAll = () => {
    function check(){
      setIsChecked(!isChecked);
      if(isCheckedMovel || isCheckedImovel){
        setIsCheckedMovel(false)
        setIsCheckedImovel(false)
      }
    }
    check()
    handleEffect()
  };

  const handleCheckboxMovel = () => {
    function checkMovel(){
      setIsCheckedMovel(!isCheckedMovel);
      if(isCheckedImovel || isChecked){
        setIsChecked(false)
        setIsCheckedImovel(false)
      }
    }
    checkMovel()
    handleEffect()
  };

  const handleCheckboxIMovel = () => {
    function checkImovel() {
      setIsCheckedImovel(!isCheckedImovel);
      if(isCheckedMovel || isChecked){
        setIsChecked(false)
        setIsCheckedMovel(false)
      }
    }
    checkImovel()
    handleEffect()
  };
  
  const handlePost = () => {
    setPostObraModal(true);
  }

  const addFilter = ( filterValue: string ) => {
			if (filterValue) {
				setActiveFilters( prev => [...prev, filterValue])
			};
      handleEffect()
	};

  const clearFilter = ( index: number) => {
		setActiveFilters( previousFilters =>{ 
			let filters = [...previousFilters]
			let updatedFilter = filters.filter( (_, currentIndex) => currentIndex !== index)
			return updatedFilter
		});
    handleEffect()
	};

  async function fetchMovel() {
    try {
      // Construa a URL com os parâmetros apenas se houver filtros definidos
      const url =
        activeFilters.length > 0
          ? `bens-moveis?${activeFilters.map(filter => `filter=${filter}`).join('&')}`
          : 'bens-moveis';

      // Faça a requisição GET com a URL construída
      const response = await Api.get(url);

      // Faça algo com a resposta, como definir o estado (setObras)
      setObras(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchImovel() {
    try {
      // Construa a URL com os parâmetros apenas se houver filtros definidos
      const url =
        activeFilters.length > 0
          ? `bens-imoveis?${activeFilters.map(filter => `filter=${filter}`).join('&')}`
          : 'bens-imoveis';

      // Faça a requisição GET com a URL construída
      const response = await Api.get(url);

      // Faça algo com a resposta, como definir o estado (setObras)
      setObras(response.data);
    } catch (error) {
      console.log(error);
    }
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
  
  async function fetchFilter() {
    try {
      // Construa a URL com os parâmetros apenas se houver filtros definidos
      const url =
        activeFilters.length > 0
          ? `obras?${activeFilters.map(filter => `filter=${filter}`).join('&')}`
          : 'obras';

      // Faça a requisição GET com a URL construída
      const response = await Api.get(url);

      // Faça algo com a resposta, como definir o estado (setObras)
      setObras(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  function handleEffect() {
    if(isCheckedMovel){
      fetchMovel();
    } else if (isCheckedImovel){
      fetchImovel()
    } else if (isChecked){
      fetchFilter()
    }
  }
  
  useEffect(() => {
    handleEffect();
  }, [activeFilters, setObras]);
      
  return (
    <div className="paintings">
      <div className="mt-10 paintings flex flex-row justify-between">
        <a className="text-[#DAA520] text-4xl font-Inter ml-20 cursor-default">Obras</a>
        <div className="flex flex-row h-7 mr-80 mt-2">
            { activeFilters.map( (filterValue, index) => 
              <FilterTag key={index} value={filterValue} onClick={() => clearFilter(index)} />	
						)} 
						<SearchInput onChange={addFilter} placeholder="Procure a obra"/>
        </div>
        <div className="flex flex-col mr-32">
          <Checkbox onChange={handleCheckboxAll} label="Todas" isChecked={isChecked}/>
          <Checkbox onChange={handleCheckboxMovel} label="Filtrar por bens móveis" isChecked={isCheckedMovel}/>
          <Checkbox onChange={handleCheckboxIMovel} label="Filtrar por bens imóveis" isChecked={isCheckedImovel}/>
        </div>
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
                {auth.email && <DeleteFilled style={{fontSize:"18px", marginTop:"5%", marginRight:"15%"}} onClick={() => deleteObra(obra.id_obra)}/>}
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