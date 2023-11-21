import './Home.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar/Navbar';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Paintings } from './components/Paintings/Paintings';
import LoginModal from './components/Login/LoginModal';
import HomeProvider from './context/HomeContext';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedLayout } from './components/ProtectedLayout/Protected';
import { AdminPage } from './components/AdminPage/Admin';
import { FichaTecnicaPage } from './components/FichaTecnica/FichaTecnica';
import { Funcionarios } from './components/FuncionariosPage/Funcionarios';
import Sobre from './components/Sobre/Sobre';

const Home = () => {
  return (
    <AuthProvider>
      <HomeProvider>
        <Router>
          <div className={`bg-white home--page flex-auto h-auto`}>
            <div className="navbar">
              <NavBar />
              <Routes>
                <Route path="" element={<LandingPage />} />
                <Route path="/fichaTecnica/:id" element={<FichaTecnicaPage />} />
                <Route path="/obras" element={<Paintings />} />
                <Route path="/login" element={<LoginModal />} />
                <Route path="/admin" element={<ProtectedLayout children={<AdminPage/>} />}/>
                <Route path="/funcionarios" element={<ProtectedLayout children={<Funcionarios/>} />}/> 
                <Route path="/sobre" element={<Sobre />} />
              </Routes>
            </div>
          </div>
        </Router>
      </HomeProvider>
    </AuthProvider>
  );
}

export default Home;


