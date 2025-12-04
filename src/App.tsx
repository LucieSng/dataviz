// On importe le hook qui va récupérer les données de l'API
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TopDirectorBarChart from "./assets/components/TopDirectorBarChart";
import HorizontalBarArrond from "./assets/components/HorizontalBarArrond";
import BarChartType from "./assets/components/BarChartType";
import LineChartYear from "./assets/components/LineChartYear";
import HeaderComponent from "./assets/components/header";
import FooterComponent from "./assets/components/footer";
import StackedAreaTypes from "./assets/components/StackedAreaTypes";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route
          path="/analyse"
          element={
            <>
              <HeaderComponent />
              <LineChartYear />
              <BarChartType />
              <HorizontalBarArrond />
              <StackedAreaTypes />
              <TopDirectorBarChart />
              <FooterComponent />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
