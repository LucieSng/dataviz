// On importe les outils de React :
// - useState : pour stocker une valeur qui peut changer
// - useEffect : pour exécuter du code automatiquement au chargement du hook
import { useEffect, useState } from "react";

export default function parisApi() {
  const apiUrl =
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=20";

  // apiData : contient les données récupérées depuis l'API
  // setApiData : sert à modifier ces données. Au début,pas encore de valeur (undefined)
  const [apiData, setApiData] = useState();

  // useEffect permet de lancer du code automatiquement
  // Le tableau [] indique que l’effet doit être exécuté : une seule fois, au chargement et jamais plus ensuite.
  // si pas de [], useEffect se relance à chaque changement de state et comme "fetchApi()" change "apiData" via "setApiData"(qui utilise un state), ça lance une boucle infinie.
  useEffect(() => {
    fetchApi();
  }, []);

  // Cette fonction va appeler l'API et récupérer les données
  const fetchApi = async () => {
    try {
      const response = await fetch(apiUrl);

      const data = await response.json();

      // On stocke les données récupérées dans setApiData
      setApiData(data);

      console.log(data);
    } catch (error) {
      //si qqch ne fonctionne pas, on affiche une erreur dans la console
      console.error("something went wrong. Not able to fetch the data.");
    }
    return;
  };

  // Le hook renvoie apiData qui est utilisé dans le fichier APP.tsx
  return { apiData };
}
