import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

//import de typage pour la legende personalisée du graph
import type { TooltipContentProps } from "recharts";

interface districtDataTypes {
  ardt_lieu: number;
  "count(*)": number;
}
interface transformedDistrictDataTypes {
  district: number;
  count: number;
}

export default function HorizontalBarArrond({ isAnimationActive = false }) {
  const [apiData, setApiData] = useState<districtDataTypes[] | undefined>(
    undefined
  );
  const [chartData, setChartData] = useState<
    transformedDistrictDataTypes[] | undefined
  >(undefined);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDataBarChartArrond();
  }, []);

  async function fetchDataBarChartArrond() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=ardt_lieu,count(*)&group_by=ardt_lieu&order_by=count(*)%20DESC&limit=100";
    try {
      const response = await fetch(url);
      const data = await response.json();

      const results = data.results;
      setApiData(results);

      const transformed = results.map((item: districtDataTypes) => ({
        district: item.ardt_lieu,
        count: item["count(*)"],
      }));
      setChartData(transformed);
    } catch (error) {
      console.error("error");
      setError("Erreur du chargement des données");
    }
  }
  //création de la legende personalisée au survol des barres du graph
  const CustomTooltip = ({
    active,
    payload,
    label,
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
              {` Arrondissement n°${label} : ${payload[0].value}`}{" "}
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
          <ComposedChart layout="vertical" data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="count" type="number" />
            <YAxis
              hide
              dataKey="district"
              type="category"
              scale="band"
              width="auto"
            />
            <Tooltip content={CustomTooltip} />
            <Legend />

            <Bar
              dataKey="count"
              barSize={20}
              fill="#413ea0"
              name="Nombre de tournage par arrondissements"
              isAnimationActive={isAnimationActive}
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
