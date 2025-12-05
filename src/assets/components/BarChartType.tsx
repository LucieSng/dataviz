// Top des types (type_tournage) : long métrage, série, téléfilm…

// Afficher le pourcentage ou le volume total.

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";
//import de typage pour la legende personalisée du graph
import type { TooltipContentProps } from "recharts";

interface typeDataTypes {
  type_tournage: "string";
  "count(*)": number;
}

interface TransformedData {
  year: string;
  count: number;
}

export default function BarChartType({ isAnimationActive = false }) {
  const [_apiData, setApiData] = useState<typeDataTypes[] | undefined>(
    undefined
  );
  const [chartData, setChartData] = useState<TransformedData[] | undefined>(
    undefined
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDataBarChartTypes();
  }, []);

  async function fetchDataBarChartTypes() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=type_tournage,count(*)&group_by=type_tournage&limit=100";

    try {
      const response = await fetch(url);
      const data = await response.json();

      const results = data.results;
      setApiData(results);

      const transformed = results.map((item: typeDataTypes) => ({
        types: item.type_tournage,
        count: item["count(*)"],
      }));
      setChartData(transformed);
      console.log("chartData type log", transformed);

      console.log(data);
    } catch (error) {
      console.error("error");
      setError("Erreur du chargement des données");
    }
  }
  //création de la legende personalisée au survol des barres du graph
  const CustomTooltip = ({
    active,
    payload,
  }: TooltipContentProps<string | number, string>) => {
    const isVisible = active && payload && payload.length;
    return (
      <div
        className="custom-tooltip"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <>
            <p className="label text-black bg-white p-1 rounded-xl">
              {`Nombre de tournages : ${payload[0].value}`}{" "}
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {chartData && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="types" />
            <YAxis width="auto" />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Bar
              dataKey="count"
              fill="#8884d8"
              name="Nombre de tournages par types"
              isAnimationActive={isAnimationActive}
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
