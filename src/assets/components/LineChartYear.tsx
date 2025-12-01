// Nombre de tournages par année.

import { useEffect, useState } from "react";
// useState et useEffect permettent de gérer les données automatiquement : stocker les données et les actionner.
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Format des données qui arrivent de l'API
interface YearlyAggregatedData {
  annee_tournage: string;
  "count(*)": number;
}

// Format simplifié pour le graphique
interface TransformedData {
  year: string;
  count: number;
}

export default function LineChartYear({ isAnimationActive = false }) {
  // apiData stocke les données brutes de l'API, setApiData est la fonction pour remplir ces boîtes
  const [apiData, setApiData] = useState<YearlyAggregatedData[] | undefined>(
    undefined
  );
  // chartData stocke les données transformées, setChartData est la fonction pour remplir ces boîtes
  const [chartData, setChartData] = useState<TransformedData[] | undefined>(
    undefined
  );

  // Dès que la page s'affiche, on lance automatiquement la fonction
  useEffect(() => {
    fetchDataLineChartYear();
  }, []); // Signifie "Lance ça une seule fois au début" pour éviter une boucle infinie

  async function fetchDataLineChartYear() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=annee_tournage,count(*)&group_by=annee_tournage&limit=100";

    try {
      const response = await fetch(url); // Va chercher les données
      // console.log("response log", response);

      const data = await response.json(); // Transforme en json
      console.log("data log", data);

      // Extrait le tableau de résultats
      const results = data.results;
      setApiData(results);
      console.log("apiData log", results); // Mettre ces données dans la première boîte

      // Transformer les données
      // map parcourt chaque élément de "results" et le transforme
      const transformed = results.map((item: YearlyAggregatedData) => ({
        year: new Date(item.annee_tournage).getFullYear().toString(),
        count: item["count(*)"],
      }));
      setChartData(transformed);
      console.log("chartData log", transformed);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {chartData &&
        chartData.length > 0 && ( // Affiche le graphique seulement si des données sont présentes
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                name="Nombre de tournages"
                isAnimationActive={isAnimationActive}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}
