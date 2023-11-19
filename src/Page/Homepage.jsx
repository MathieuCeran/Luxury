import { Link } from "react-router-dom";
import Header from "../Component/Header";
import data from "./../data.json";

const Homepage = () => {
  console.log(data);

  return (
    <>
      <Header />
      <main>
        <section className="welcome">
          <h1>Bienvenue au Luxury </h1>
          <h2>Parcourir nos catégories</h2>
        </section>

        <section className="card_category">
          {Object.keys(data).map((category) => (
            <Link to={`/categorie/${category}`} key={category} className="card">
              <article className="categorieTitle">
                <h3>{category}</h3>
              </article>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default Homepage;
