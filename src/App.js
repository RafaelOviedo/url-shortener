import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import LandingPage from './views/LandingPage/LandingPage';
import About from './views/About/About';
import Error404 from './views/Error404/Error404';
import style from './App.module.css';
import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className={style.appContainer}>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<About />} />
        
        <Route path='/*' element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
