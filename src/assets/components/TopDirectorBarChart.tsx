import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { TooltipContentProps } from "recharts";

interface topDirectorDataTypes {
  nom_realisateur: "string";
  "count(*)": number;
  annee_tournage: string;
}
interface transformedTopDirectorDataTypes {
  director: "string";
  count: number;
  year: string;
}

export default function TopDirectorBarChart({ isAnimationActive = false }) {
  // ========================================
  // 1. DÉCLARATION DES ÉTATS (useState)
  // ========================================
  // Les états permettent de stocker des données qui peuvent changer dans le temps

  // Stocke les données brutes reçues de l'API
  const [apiData, setApiData] = useState<topDirectorDataTypes[] | undefined>(
    undefined
  );

  // Stocke les données transformées et prêtes pour le graphique
  const [chartData, setChartData] = useState<
    transformedTopDirectorDataTypes[] | undefined
  >(undefined);

  // Stocke l'année sélectionnée par l'utilisateur (par défaut "all" = toutes les années)
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // ========================================
  // 2. EFFET AU CHARGEMENT DU COMPOSANT
  // ========================================
  // useEffect avec un tableau vide [] s'exécute une seule fois au chargement
  useEffect(() => {
    fetchDataTopDirector(); // Appelle la fonction pour récupérer les données
  }, []);

  // ========================================
  // 3. FONCTION POUR RÉCUPÉRER LES DONNÉES
  // ========================================
  async function fetchDataTopDirector() {
    const url =
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=nom_realisateur,annee_tournage,count(*)&where=nom_realisateur%20is%20not%20null&group_by=annee_tournage,nom_realisateur&order_by=count(*)%20DESC&limit=100";

    try {
      const response = await fetch(url);

      const data = await response.json();

      // Extraction du tableau "results" depuis la réponse
      const results = data.results;

      // Sauvegarde des données brutes dans l'état
      setApiData(results);

      // TRANSFORMATION DES DONNÉES pour le graphique
      // On convertit chaque élément de l'API en un format plus simple
      const transformed = results.map((item: topDirectorDataTypes) => ({
        director: item.nom_realisateur, // Nom du réalisateur
        count: item["count(*)"], // Nombre de tournages
        year: new Date(item.annee_tournage) // Extraction de l'année depuis la date
          .getFullYear()
          .toString(),
      }));

      console.log("transformed", transformed);
      console.log("data", data);

      // Sauvegarde des données transformées dans l'état
      setChartData(transformed);
    } catch (error) {
      console.error("Error");
    }
  }

  // ========================================
  // 4. CALCUL DES ANNÉES DISPONIBLES
  // ========================================
  // useMemo permet de mémoriser le résultat et ne recalculer que si chartData change
  const availableYears = useMemo(() => {
    // Si pas de données, retourner un tableau vide
    if (!chartData) return [];

    // Extraire toutes les années uniques du tableau
    // new Set() élimine les doublons
    const years = Array.from(new Set(chartData.map((item) => item.year)));

    // Trier les années par ordre décroissant (2024, 2023, 2022...)
    return years.sort((a, b) => b.localeCompare(a));
  }, [chartData]); // Ne recalcule que si chartData change

  // ========================================
  // 5. FILTRAGE DES DONNÉES POUR LE GRAPHIQUE
  // ========================================
  const filteredChartData = useMemo(() => {
    // Si pas de données, retourner un tableau vide
    if (!chartData) return [];

    // CAS 1 : Si "Toutes les années" est sélectionné
    if (selectedYear === "all") {
      // Créer une Map pour grouper par réalisateur
      // Map = structure de données clé-valeur (ici: nom réalisateur → nombre total)
      const directorMap = new Map<string, number>();

      // Pour chaque ligne de données
      chartData.forEach((item) => {
        // Récupérer le count actuel du réalisateur (ou 0 s'il n'existe pas encore)
        const current = directorMap.get(item.director) || 0;

        // Additionner le nouveau count au total
        directorMap.set(item.director, current + item.count);
      });

      // Convertir la Map en tableau et formater
      return Array.from(directorMap.entries())
        .map(([director, count]) => ({ director, count, year: "all" }))
        .sort((a, b) => b.count - a.count) // Trier par count décroissant
        .slice(0, 10); // Garder seulement les 10 premiers
    }

    // CAS 2 : Si une année spécifique est sélectionnée
    return chartData
      .filter((item) => item.year === selectedYear) // Filtrer par année
      .sort((a, b) => b.count - a.count) // Trier par count décroissant
      .slice(0, 10); // Garder les 10 premiers
  }, [chartData, selectedYear]); // Recalculer si chartData ou selectedYear change

  // ========================================
  // 6. COMPOSANT PERSONNALISÉ POUR L'INFOBULLE
  // ========================================
  const CustomTooltip = ({
    active,
    payload,
  }: TooltipContentProps<string | number, string>) => {
    // Vérifier si l'infobulle doit être visible
    const isVisible = active && payload && payload.length;

    return (
      <div
        className="custom-tooltip"
        // Afficher ou masquer selon isVisible
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <>
            {/* Afficher le nom du réalisateur */}
            <p className="label text-black bg-white p-1 rounded-xl">
              {` Realisateur : ${payload[0].value}`}
            </p>
          </>
        )}
      </div>
    );
  };

  // ========================================
  // 7. RENDU DU COMPOSANT (INTERFACE)
  // ========================================
  return (
    <div>
      <div className=" text-white">
        {/* <h1 className="text-3xl font-bold mb-8 text-center">
          Top Réalisateurs - Tournages à Paris
        </h1> */}

        {/* MENU DÉROULANT DE SÉLECTION D'ANNÉE */}
        {availableYears.length > 0 && (
          <div className="mb-6 flex justify-center items-center gap-4">
            <label htmlFor="year-select" className="text-lg font-semibold">
              Sélectionner une année :
            </label>

            {/* Menu select */}
            <select
              id="year-select"
              value={selectedYear}
              // Quand l'utilisateur change l'année, mettre à jour l'état
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white text-black px-4 py-2 rounded-lg border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              {/* Option pour toutes les années */}
              <option value="all">Toutes les années</option>

              {/* Créer une option pour chaque année disponible */}
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Afficher le nombre de réalisateurs */}
            <span className="text-gray-400 text-sm">
              ({filteredChartData.length} réalisateur
              {filteredChartData.length > 1 ? "s" : ""})
            </span>
          </div>
        )}

        {filteredChartData && filteredChartData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="director" />

              <YAxis width="auto" dataKey="count" />

              <Tooltip content={CustomTooltip} />

              <Legend />

              <Bar
                dataKey="count"
                fill="#8884d8"
                name="Top 10 des Réalisateurs par année"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
                isAnimationActive={isAnimationActive}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
