import { Link } from 'react-router-dom';  // Importe o componente Link
import Logo from '../assets/grifo-imagem.png';
import './Navbar.css';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import LoginModal from './LoginModal';

export const NavBar = () => {
  const NAVIGATION_LINKS = [
    { name: 'Início', route: '' },
    { name: 'Obras', route: '/obras' },
    { name: 'Sobre', route: '/sobre' },
  ];

  const { setOpenUserCredentialsModal, openUserCredentialsModal } = useContext(HomeContext)

  const handleLoginClick = () => {
      setOpenUserCredentialsModal(true);
  }
  return (
    <header className="font-Inter navbar--container bg-white flex justify-between items-center h-14 px-12 shadow-md">
      <Link to="">
        <img src={Logo} className="h-10" alt="qtrace company logomark" />
      </Link>
      <nav className="navbar--links-container flex items-center gap-7 h-full relative bg-white">
        {NAVIGATION_LINKS.map((navLink, index) => (
          <Link to={navLink.route} key={index}>
            <span className="text-grey5 font-medium text-[1.04rem]">{navLink.name}</span>
          </Link>
        ))}
        <div>
          <button className="w-24 text-grey5 font-medium text-md bg-[#DAA520] rounded-full hover:bg-violet-600" onClick={handleLoginClick}>Login</button>
        </div>
      </nav>
    </header>
  );
};

