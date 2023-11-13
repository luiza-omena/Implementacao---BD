import './Home.css'
import { NavBar } from './components/Navbar'

const Home = () => {

  return (
    <>
     <div className={`bg-white home--page flex-auto h-auto`}>        
        <div className="navbar"> 
          <NavBar />
        </div>
    </div>
    </>
  );
}

export default Home
