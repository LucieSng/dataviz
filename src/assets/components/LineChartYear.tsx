import { useEffect, useState } from "react";
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

interface YearlyAggregatedData {
  annee_tournage: string;
  "count(*)": number;
}

interface TransformedData {
  year: string;
  count: number;
}

export default function LineChartYear({ isAnimationActive = false }) {
  const [apiData, setApiData] = useState<YearlyAggregatedData[] | undefined>(
    undefined
  );
  const [chartData, setChartData] = useState<TransformedData[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchDataLineChartYear();
  }, []);

  async function fetchDataLineChartYear() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=annee_tournage,count(*)&group_by=annee_tournage&limit=100";

    try {
      const response = await fetch(url);
      console.log("response log", response);

      const data = await response.json();
      console.log("data log", data);

      // Extract the results array from the API response
      const results = data.results;
      setApiData(results);
      console.log("apiData log", results);

      // Transform data to extract year and rename count field
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
      {chartData && chartData.length > 0 && (
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
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
