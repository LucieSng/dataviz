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
  annee_tournage: "number";
  "count(*)": number;
}

interface TransformedData {
  year: string;
  count: number;
}

const years = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
];

export default function BarChartType({ isAnimationActive = false }) {
  const [_apiData, setApiData] = useState<typeDataTypes[] | undefined>(
    undefined
  );
  const [chartData, setChartData] = useState<TransformedData[] | undefined>(
    undefined
  );

  const [error, setError] = useState<string | null>(null);

  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    fetchDataBarChartTypes(selectedYear);
  }, [selectedYear]);

  async function fetchDataBarChartTypes(year: string | null = null) {
    const baseUrl =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=type_tournage,count(*)&group_by=type_tournage&limit=100";
    let url = baseUrl;
    // Appel URL dynamique pour gérer le filtre sélectionné par l'user
    if (year !== null) {
      url = `${baseUrl}&where=date_debut>="${year}-01-01" AND date_debut<="${year}-12-31"`;
    } else {
      url = baseUrl;
    }

    console.log("URL appelée :", url);

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
      <select
        value={selectedYear || ""}
        onChange={(e) => {
          setSelectedYear(e.target.value || null);
        }}
        style={{
          border: "solid grey 1px",
          borderRadius: "8px",
          padding: "10px",
          margin: "12px",
        }}
      >
        <option value="">Toutes les années</option>
        {years.map(
          (
            year // Boucler sur le tableau de dates
          ) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
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
