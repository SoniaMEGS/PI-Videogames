import { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import React from "react";
import Searcher from "./components/Searcher";
import Cards from "./components/Cards";
import Loader from "./components/Loader.jsx";
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
      const videogamesRes = await getVideogame(10);
      dispatch(setVideogames(videogamesRes));
      dispatch(setLoading(false));
    };
    fetchVideogames();
  }, [filtering]);

  return (
    <div>
      <div className="app">
        <Searcher videogames={videogames} />
        {loading ? (
          <Loader />
        ) : (
          <Cards videogames={filtering ? search : videogames} />
        )}
      </div>
    </div>
  );
}

export default App;
