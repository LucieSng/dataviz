import { Link } from "react-router-dom";

const HeaderComponent = () => (
  <nav className="sticky top-0 z-50 bg-blue-700 h-16 flex items-center px-4">
    <Link
      to="/"
      aria-label="Retourner à l'accueil"
      className="cursor-pointer hover:text-blue-600 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-house-icon lucide-house"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    </Link>
    <div className="flex-1 items-center text-center mt-8">
      <h1 className="text-white text-2xl md:text-2xl font-bold mb-8">
        Dataviz, vos données ciné à Paris
      </h1>
    </div>
  </nav>
);

export default HeaderComponent;
