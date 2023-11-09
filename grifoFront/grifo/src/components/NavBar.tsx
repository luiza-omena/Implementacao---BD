import "./Navbar.css";
import Logo from "../assets/logo.svg"

export const NavBar = () => {

  const NAVIGATION_LINKS = [
    { name: 'Home', route:'/home'}, 
    { name: 'What we do', route:'/company'}, 
    { name: 'About us', route:'/about'}, 
    { name: 'Contact', route:'/contact'} 
  ];

  return (
    <>
    <header className="font-Inter navbar--container bg-white flex justify-between items-center h-20 px-12 shadow-md relative z-[150]">
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
