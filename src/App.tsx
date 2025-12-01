// On importe le hook qui va récupérer les données de l'API
import HorizontalBarArrond from "./assets/components/HorizontalBarArrond";
import BarChartType from "./assets/components/BarChartType";
import LineChartYear from "./assets/components/LineChartYear";
import HeaderComponent from "./assets/components/header";
import FooterComponent from "./assets/components/footer";
import StackedAreaTypes from "./assets/components/StackedAreaTypes";
import "./App.css";

function App() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <LineChartYear />
      <BarChartType />
      <HorizontalBarArrond />
      <StackedAreaTypes />
      <FooterComponent></FooterComponent>
    </>
  );
}

export default App;
