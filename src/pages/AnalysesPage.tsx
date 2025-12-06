import TopDirectorBarChart from "../assets/components/TopDirectorBarChart";
import HorizontalBarArrond from "../assets/components/HorizontalBarArrond";
import BarChartType from "../assets/components/BarChartType";
import LineChartYear from "../assets/components/LineChartYear";
import HeaderComponent from "../assets/components/header";
import FooterComponent from "../assets/components/footer";
import StackedAreaTypes from "../assets/components/StackedAreaTypes";

export default function AnalysesPage() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="grid-cols-2 gap-10 p-10 md:grid bg-[#ebfdfe]">
        <div className="rounded-box border-2  p-4 shadow-md bg-white">
          <LineChartYear />
        </div>
        <div className="rounded-box border-2  p-4 shadow-md bg-white">
          <BarChartType />
        </div>
        <div className="rounded-box border-2  p-4 shadow-md bg-white">
          <HorizontalBarArrond />
        </div>
        <div className="rounded-box border-2  p-4 shadow-md bg-white">
          <StackedAreaTypes />
        </div>
        <div className="rounded-box border-2  p-4 shadow-md bg-white">
          <TopDirectorBarChart />
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </>
  );
}
