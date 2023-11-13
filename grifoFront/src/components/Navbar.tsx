import Logo  from "../assets/grigoLogo.png";
import "./Navbar.css";


export const NavBar = () => {

  const NAVIGATION_LINKS = [
    { name: 'Início', route:'/inicio'}, 
    { name: 'Obras', route:'/obras'}, 
    { name: 'Sobre', route:'/sobre'}, 
    { name: 'Contato', route:'/contato'} 
  ];

  return (
    <>
    <header className="font-Inter navbar--container bg-white flex justify-between items-center h-10 px-12 shadow-md">
      <img src={Logo} className="h-10" alt="qtrace company logomark" />
      <nav className="navbar--links-container flex items-center gap-7 h-full relative bg-white">
        { NAVIGATION_LINKS.map( (navLink, index) => (
          <a 
            href={"#"}
            key={index}
            className="text-grey5 font-medium text-[1.04rem]"
          >
            {navLink.name}
          </a>
        ))}
      </nav>
    </header>
    </>
  );
};
