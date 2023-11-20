import { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data.json"; // Assurez-vous d'ajuster le chemin si nécessaire
import Header from "../Component/Header";
import Stock from "../assets/stock.png";
const Category = () => {
  const { name } = useParams();
  const [filters, setFilters] = useState({
    weight: "",
    price: "",
    sortByWeight: "none",
    sortByPrice: "none",
  });
  if (!(name in data)) {
    return <div>Catégorie non trouvée</div>;
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = (item) => {
    const { weight, price } = filters;

    // Appliquer les filtres
    if (weight && item.Coffre !== weight) {
      return false;
    }

    if (price) {
      const itemPrice = parseFloat(item.Prix.replace("$", "").replace(",", ""));
      if (price === "moinsChere" && itemPrice > 0) {
        return true;
      }
      if (price === "plusChere" && itemPrice > 0) {
        return true;
      }
      return false;
    }

    return true;
  };

  const applySort = (a, b, sortBy, sortOrder) => {
    const aValue =
      sortBy === "weight"
        ? a.Coffre
        : parseFloat(a.Prix.replace("$", "").replace(",", ""));
    const bValue =
      sortBy === "weight"
        ? b.Coffre
        : parseFloat(b.Prix.replace("$", "").replace(",", ""));

    if (sortOrder === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  };

  const sortedData = data[name].filter(applyFilters).sort((a, b) => {
    if (filters.sortByWeight !== "none") {
      return applySort(a, b, "weight", filters.sortByWeight);
    } else if (filters.sortByPrice !== "none") {
      return applySort(a, b, "price", filters.sortByPrice);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Header />
      <section className="titleCategorie">
        <h1>{name}</h1>
      </section>

      <div className="filter">
        <div>
          <label>
            Trier par poids du coffre:
            <select
              name="sortByWeight"
              value={filters.sortByWeight}
              onChange={handleFilterChange}
            >
              <option value="none">Aucun tri</option>
              <option value="asc">Du plus capacitant au moins</option>
              <option value="desc">Du moins capacitant au plus</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Trier par prix:
            <select
              name="sortByPrice"
              value={filters.sortByPrice}
              onChange={handleFilterChange}
            >
              <option value="none">Aucun tri</option>
              <option value="asc">Du moins cher au plus cher</option>
              <option value="desc">Du plus cher au moins cher</option>
            </select>
          </label>
        </div>
      </div>

      <ul className="vl">
        {sortedData.map((item) => (
          <li key={item.Marque} className="VlCard">
            <img
              src={item.image}
              alt={item.Marque}
              style={{ width: "100%", height: "100%" }}
            />
            {item.stock === true ? null : (
              <img
                src={Stock}
                alt={item.Marque}
                style={{
                  width: "58%",
                  height: "47%",
                  position: "absolute",
                  top: "37px",
                }}
              />
            )}

            <p className="marque">{item.Marque}</p>
            {item.stock === true ? (
              <p className="prix">Prix : {item.Prix} </p>
            ) : (
              <p className="prix-barre">Prix : {item.Prix} </p>
            )}

            <p className="coffre">Coffre : {item.Coffre} kg</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
