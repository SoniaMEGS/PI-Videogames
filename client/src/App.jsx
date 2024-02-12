import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Searcher from "./components/Searcher";
import Cards from "./components/Cards";
import Loader from "./components/Loader.jsx";
import NavBar from "./components/NavBar.jsx";
import DetailData from "./components/DetailData.jsx";
import Form from "./components/Form.jsx";
import { getVideogame } from "./api/index";
import { setVideogames, setLoading } from "./redux/actions.js";
import "./App.css";

function App() {
  const videogames = useSelector((state) => state.videogames);
  const search = useSelector((state) => state.search);
  const loading = useSelector((state) => state.loading);
  const filtering = useSelector((state) => state.filtering);
  const dispatch = useDispatch();
  //const [videogames, setVideogames] = useState([]);

  //Funcion que llama la api
  useEffect(() => {
    const fetchVideogames = async () => {
      dispatch(setLoading(true));
      const videogamesRes = await getVideogame(100);
      dispatch(setVideogames(videogamesRes));
      dispatch(setLoading(false));
    };
    fetchVideogames();
  }, [filtering]);

  return (
    <div>
      <div className="app">
        <NavBar />
        <Routes>
          <Route
            path="/home"
            element={
              loading ? (
                <Loader />
              ) : (
                <Cards videogames={filtering ? search : videogames} />
              )
            }
          />
          <Route path="/detail/:id" element={<DetailData />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
