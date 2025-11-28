// Tournages par année tous types confondus.

// Import du graph depuis recharts.
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import { useEffect, useState } from "react";

// Récupérer la data de l'api
export default function LineChartYear({ isAnimationActive = false }) {
  const [apiData, setApiData] = useState();
  // apiData contient les données envoyées par setApiData qui lui-même récupère les données stockées dans useState
  useEffect(() => {
    fetchDataLineChartYear();
  }, []);
  // useEffect permet de lancer du code automatiquement, dans ce cas il lance automatiquement fetchDataLineChartYear
  // Le tableau [] indique que l’effet doit être exécuté : une seule fois, au chargement et jamais plus ensuite.
  // si pas de [], useEffect se relance à chaque changement de state et comme "fetchDataLineChartYear" change "apiData" via "setApiData"(qui utilise un state), ça lance une boucle infinie.

  async function fetchDataLineChartYear() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=annee_tournage,count(*)&group_by=annee_tournage&limit=100";
    try {
      const response = await fetch(url);

      const data = await response.json();

      setApiData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Message pour le chargement des données
  if (!apiData) {
    return <div>Chargement des données...</div>;
  }

  // Afficher le graph
  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={apiData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        isAnimationActive={isAnimationActive}
      />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="#82ca9d"
        isAnimationActive={isAnimationActive}
      />
    </LineChart>
  );
}
