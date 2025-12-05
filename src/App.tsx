// On importe le hook qui va récupérer les données de l'API
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AnalysesPage from "./pages/AnalysesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AnalysesPage" element={<AnalysesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
