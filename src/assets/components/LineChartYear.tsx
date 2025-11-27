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

import useParisApi from "./hooks/useParisApi";

// Récupérer la data de l'api et l'afficher sur App.tsx
// Grouper par année, récupérer que les années
// Compter le nombre de tournages par année avec "count"
// Trier par année croissante avec "sort"

const LineChartYear = ({ isAnimationActive = false }) => {
  // On définit une URL spécifique pour ce graphique qui récupère les tournages groupés par année
  const apiUrl =
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=annee_tournage,count(*)&group_by=annee_tournage&limit=100";
  const { apiData } = useParisApi(apiUrl);

  // Message pour le chargement des données
  if (!apiData?.results) {
    return <div>Chargement des données...</div>;
  }

  // Transformation des données
  const chartData = apiData.results.map((item: any) => ({
    name: item.annee_tournage,
    tournages: item.count,
  }));

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
};

export default LineChartYear;
