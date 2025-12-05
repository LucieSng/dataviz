// On importe le hook qui va récupérer les données de l'API
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AnalysesPage from "./pages/AnalysesPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AnalysesPage" element={<AnalysesPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
