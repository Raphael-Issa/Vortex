import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./telas/Home.jsx";
import { Saiba } from "./telas/Saiba.jsx";
import { Catalogos } from './telas/Catalogos.jsx';
import { DetalhesManga } from './telas/DetalhesManga.jsx';
import { HardwareBackButtonHandler } from './componentes/HardwareBackButtonHandler.jsx';

function App() {
  return (
    <BrowserRouter>
      <HardwareBackButtonHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogos" element={<Catalogos />} />
        <Route path="/saiba" element={<Saiba />} />
        <Route path="/manga/:id" element={<DetalhesManga />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;