// Type de tournages au total par année
import { useEffect, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface AggregatedData {
  annee_tournage: string;
  type_tournage: string;
  "count(*)": number;
}

interface TransformedData {
  year: string;
  type: string;
  count: number;
}

export default function StackedAreaTypes({ isAnimationActive = false }) {
  const [apiData, setApiData] = useState<AggregatedData[] | undefined>(
    undefined
  );
  const [chartData, setChartData] = useState<TransformedData[] | undefined>(
    undefined
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDataStackedAreaTypes();
  }, []);

  async function fetchDataStackedAreaTypes() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=annee_tournage%2Ctype_tournage%2Ccount(*)&group_by=annee_tournage%2Ctype_tournage";

    try {
      const response = await fetch(url);

      const data = await response.json();

      // Extraire les données de l'API
      const results = data.results;
      setApiData(results);

      // Chaque élément de results est transformé avec des propriétés renommées et nettoyées
      const transformed = results.map((item: AggregatedData) => ({
        // map crée un nouveau tableau et transforme chaque élément selon les instructions suivantes
        year: new Date(item.annee_tournage).getFullYear().toString(), // ne garder que l'année
        type: item.type_tournage.trim().toLowerCase(), // supprimer les espaces en début et fin de chaîne, et mettre en minuscule
        count: item["count(*)"], // renommer count, on met des crochets car le nom contient des caractères spéciaux
      }));

      // Créer un objet vide pour stocker les données regroupées par année
      const dataParAnnee: { [key: string]: any } = {};
      transformed.forEach((item: TransformedData) => {
        // Parcourir chaque élément un par un
        const annee = item.year;
        const typeTournage = item.type;
        const nombreTournages = item.count;
        const anneeExiste = dataParAnnee[annee]; // Vérifier si cette année existe déjà

        if (!anneeExiste) {
          dataParAnnee[annee] = { year: annee }; // Créer la date non existante
        }
        dataParAnnee[annee][typeTournage] = nombreTournages; // Ajouter le nombre de tournages pour chaque type
      });

      // Convertir l'objet en tableau d'années et le transformer en tableau
      const tableauFinal = Object.values(dataParAnnee); //
      const typesUniques = new Set(); // Permet de garder que des valeurs uniques
      tableauFinal.forEach((item) => {
        const etiquettes = Object.keys(item); // Créer un tableau qui recupère toutes les clés
        let totalTournages = 0; // Accumuler tous les tournages
        etiquettes.forEach((uneEtiquette) => {
          // Pour chaque clé, vérifier si c'est un type de tournage
          if (uneEtiquette !== "year") {
            typesUniques.add(uneEtiquette); // Ajouter chaque type de tournage dans le Set et collecter les types uniques
            totalTournages = totalTournages + item[uneEtiquette]; // J'ajoute le nombre de tournages pour chaque type
          }
        });

        item.total = totalTournages;
      });

      // Envoyer le tableau au state
      setChartData(tableauFinal);

      console.log(data);
    } catch (error) {
      console.error(error);
      setError("Erreur de chargement des données");
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {chartData && chartData.length > 0 && (
        <AreaChart
          style={{
            width: "100%",
            maxHeight: "40vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={chartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLongMetrage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTelefilm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSerieTV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#413ea0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSerieWeb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f5f5f5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey="total" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="long métrage"
            stroke="#413ea0"
            name="Long métrage"
            fillOpacity={1}
            fill="url(#colorLongMetrage)"
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="téléfilm"
            stroke="#82ca9d"
            name="Téléfilm"
            fillOpacity={1}
            fill="url(#colorTelefilm)"
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="série tv"
            stroke="#413ea0"
            name="Série tv"
            fillOpacity={1}
            fill="url(#colorSerieTV)"
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="série web"
            name="Série web"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorSerieWeb)"
            isAnimationActive={isAnimationActive}
          />
        </AreaChart>
      )}
    </div>
  );
}
