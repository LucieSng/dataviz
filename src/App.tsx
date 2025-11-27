// On importe le hook qui va récupérer les données de l'API
// import useParisApi from "./assets/components/hooks/useParisApi";
import LineChartYear from "./assets/components/LineChartYear";

import "./App.css";

function App() {
  //le hook "useParisApi" retourne un objet contenant la donnée récupérée avec l'appel d'api et la propriété {apidata} permet d'extraire celle ci de cet objet.
  // const { apiData } = useParisApi();
  return (
    <>
      <LineChartYear></LineChartYear>
    </>
  );
}

export default App;
