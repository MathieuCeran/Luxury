import "./App.css";
import Category from "./Page/Category";
import Homepage from "./Page/Homepage";
import { Route, Routes } from "react-router-dom";
import SearchResults from "./Page/SearchResults";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/categorie/:name" element={<Category />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default App;
