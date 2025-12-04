const HeaderComponent = () => (
  <header className="navbar bg-blue-700">
    <div className="flex-1">
      <Link to="/analysesPage">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-ghost">
          Accueil
        </button>
      </Link>
    </div>
    <div className="flex-1">
      <h1>Dataviz, vos données ciné à Paris</h1>
    </div>

    <div className="flex-none"></div>
  </header>
);
export default HeaderComponent;
