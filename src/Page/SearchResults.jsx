import { useLocation } from "react-router-dom";
import data from "../data.json";
import Header from "../Component/Header";

const SearchResults = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("term");

  // Filtrer les données en fonction du terme de recherche
  const searchResults = Object.keys(data).reduce((acc, category) => {
    const categoryResults = data[category].filter(
      (item) => item.Marque.toLowerCase() === searchTerm.toLowerCase()
    );

    if (categoryResults.length > 0) {
      acc.push({ category, results: categoryResults });
    }

    return acc;
  }, []);

  return (
    <>
      <Header />

      <div>
        <h1>Résultats de la recherche pour {searchTerm}</h1>
        {searchResults.length === 0 ? (
          <p>Aucun résultat trouvé.</p>
        ) : (
          searchResults.map((result) => (
            <div key={result.category}>
              <section className="titleCategorie">
                <h2>{result.category}</h2>
              </section>

              <ul className="vl">
                {result.results.map((item, index) => (
                  <li key={index} className="VlCard">
                    <img
                      src={item.image}
                      alt={item.Marque}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <p className="marque">{item.Marque}</p>
                    <p className="prix">Prix : {item.Prix} </p>
                    <p className="coffre">Coffre : {item.Coffre} kg</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SearchResults;
