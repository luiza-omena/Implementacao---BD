import { useContext } from 'react';
import './Sobre.css';
import { HomeContext } from '../../context/HomeContext';
import LoginModal from '../Login/LoginModal';

const Sobre = () => {
  const { openUserCredentialsModal } = useContext(HomeContext)
  return (
    <div className='flex flex-col justify-between'>
        <div className="landing h-80 flex justify-center container">
            <a className="text-grey1 text-4xl font-Inter font-bold mt-32 cursor-default ml-80"> Grifo Diagnóstico e Preservação de Bens Culturais </a>
        </div>
        <div className=''>
          <p className='text-justify font-Poppins text-3xl leading-relaxed whitespace-normal mx-28 mt-8'>         
            A empresa Grifo, estabelecida em 2002 por Pérside Omena, destaca-se no mercado ao dedicar-se à recuperação de obras de arte, 
            abrangendo tanto bens móveis, como quadros e esculturas, quanto bens imóveis, como igrejas e tetos de catedrais. 
            Com uma sólida expertise no setor, a Grifo tem como missão preservar e revitalizar o patrimônio artístico, 
            oferecendo serviços especializados de restauração que unem técnica, paixão e compromisso. 
            Navegue em nosso site para conhecer mais sobre nossa trajetória e 
            os projetos inspiradores que contribuíram para a valorização e conservação do legado artístico ao longo dos anos.
          </p>
        </div>
      {openUserCredentialsModal && <LoginModal/>}
    </div>
  );
};

export default Sobre;
