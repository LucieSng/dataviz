import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AnalysesPage from "./pages/AnalysesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/AnalysesPage" element={<AnalysesPage />} />
        />
      </Routes>
    </Router>
   
  );
}

export default App;
