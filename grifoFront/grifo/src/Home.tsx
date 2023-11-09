import "./Home.css";
import { NavBar } from "./components/NavBar";

export const Home = () => {

  return (
    <div className="bg-neutral-200 home--page flex-auto h-auto">
        <div className="navbar"> 
          <NavBar />
        </div>
    </div>
  );
};