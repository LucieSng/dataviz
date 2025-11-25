// On importe le hook qui va récupérer les données de l'API
import useParisApi from "./assets/components/hooks/useParisApi";

import "./App.css";

import "./App.css";

function App() {
  //le hook "useParisApi" retourne un objet contenant la donnée récupérée avec l'appel d'api et la propriété {apidata} permet d'extraire celle ci de cet objet.
  const { apiData } = useParisApi();

  return (
    <>
      <div>
        {/* on affiche les données du json sous forme de string
        A retirer plus tard:test de fonctionnement de l'appel d'api */}
        <div>{JSON.stringify(apiData)}</div>
      </div>
    </>
  );
}

export default App;
