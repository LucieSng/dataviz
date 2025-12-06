const FooterComponent = () => (
  <footer className="bg-blue-700 text-white py-12">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 grid-cols-2 gap-32">
        <div>
          <h1 className="font-regular text-xl mb-4">
            Ce projet a pour objectif de rendre visible l’activité
            cinématographique française à partir des données ouvertes de la
            Ville de Paris.
          </h1>
          <a
            href="https://github.com/LucieSng/dataviz"
            className="font-bold underline"
          >
            Découvrir le repository
          </a>
        </div>
        <div>
          <h1 className="font-medium mb-3">
            Mélissa Largilliere •
            <a
              href="https://github.com/piouoiq"
              className="font-bold ml-2 underline"
            >
              Git
            </a>
          </h1>
          <h1 className="font-medium mb-3">
            Lucie Seng •
            <a
              href="https://github.com/LucieSng"
              className="font-bold ml-2 underline"
            >
              Git
            </a>
          </h1>
          <p className="font-medium">
            Promotion Grace Hopper • Ada Tech School
          </p>
        </div>
      </div>
    </div>
  </footer>
);
export default FooterComponent;
