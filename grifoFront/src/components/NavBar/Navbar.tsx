import { Link } from 'react-router-dom';
import Logo from '../../assets/grifo-imagem.png';
import './Navbar.css';
import { useContext } from 'react';
import HomeProvider, { HomeContext } from '../../context/HomeContext';
import { LockOutlined } from '@ant-design/icons';

export const NavBar = () => {
  const NAVIGATION_LINKS = [
    { name: 'Início', route: '' },
    { name: 'Obras', route: '/obras' },
    { name: 'Sobre', route: '/sobre' },
  ];

  const { setOpenUserCredentialsModal } = useContext(HomeContext)

  const handleLoginClick = () => {
      setOpenUserCredentialsModal(true);
  }
  return (
    <HomeProvider>
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
          <div className="text-grey5 font-medium cursor-pointer hover:text-[#DAA520]" onClick={handleLoginClick}> 
            <LockOutlined style={{marginBottom: "8px", fontSize: "20px"}}/>
          </div>
        </nav>
      </header>
    </HomeProvider>
  );
};

