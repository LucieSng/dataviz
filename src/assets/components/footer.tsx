const FooterComponent = () => (
  <footer className="bg-violet-900 text-white px-6 py-10 flex flex-col gap-10 lg:flex-row lg:justify-between">
    <div className="container-description">
      <div className="">
        Ce projet a pour objectif de rendre visible l’activité cinématographique
        française à partir des données ouvertes de la Ville de Paris.
        <a
          href="https://github.com/LucieSng/dataviz"
          className="font-medium text-fg-brand hover:underline"
        >
          Lien du repository
        </a>
      </div>
    </div>
    <div className="container-author">
      <h1 className="">Mélissa Largilliere</h1>
      <p className="text-body font-medium">
        <a
          href="https://github.com/piouoiq"
          className="font-medium text-fg-brand hover:underline"
        >
          Lien Git
        </a>
      </p>
      <h1>Lucie Seng</h1>{" "}
      <p className="text-body font-medium ">
        <a
          href="https://github.com/LucieSng"
          className="font-medium text-fg-brand hover:underline"
        >
          Lien Git
        </a>
      </p>
    </div>

    <div className="container-">
      <p className="font-medium">Promotion Grace Hopper - Ada Tech School</p>
    </div>
  </footer>
);
export default FooterComponent;
