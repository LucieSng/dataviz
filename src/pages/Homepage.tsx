import FooterComponent from "../assets/components/footer";
import "../App.css";
import backgroundImage from "../assets/components/images/background.jpg";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const nav = useNavigate();
  const navigate = () => {
    nav("/AnalysesPage");
  };
  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-gradient-to-b from-transparent via-black/80 to-black"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-end px-4 m-32">
        <div className="text-left">
          <h1 className="text-white text-9xl md:text-10xl font-extrabold mb-8">
            Dataviz
          </h1>
          <h2 className="text-white text-4xl md:text-4xl font-bold mb-8">
            Vos données ciné à Paris
          </h2>
          <button
            onClick={navigate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Découvrir
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <FooterComponent />
      </div>
    </div>
  );
}
