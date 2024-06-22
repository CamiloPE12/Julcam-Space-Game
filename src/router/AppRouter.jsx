// src/router/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import Contacto from '../paginas/contacto';
import MasInformacion from '../paginas/MasInformacion';
import App from '../App'; // Esto es tu página "Inicio"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/mas-informacion" element={<MasInformacion />} />
    </Routes>
  );
};

export default AppRouter;

