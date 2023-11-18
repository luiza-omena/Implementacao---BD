import './Home.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar/Navbar';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Paintings } from './components/Paintings/Paintings';

const Home = () => {
  return (
    <Router>
      <div className={`bg-white home--page flex-auto h-auto`}>
        <div className="navbar">
          <NavBar />
          <Routes>
            <Route path="" element={<LandingPage />} />
            <Route path="/obras" element={<Paintings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Home;


