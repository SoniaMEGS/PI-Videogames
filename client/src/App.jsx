import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Searcher from "./components/Searcher";
import Cards from "./components/Cards";
import Loader from "./components/Loader.jsx";
import { getVideogame } from "./api/index";
import { setVideogames, setLoading } from "./redux/actions.js";
import "./App.css";

function App() {
  const videogames = useSelector((state) => state.videogames);
  const loading = useSelector((state) => state.loading);
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
  }, []);

  return (
    <div>
      <div className="app">
        <Searcher />
        {loading ? <Loader /> : <Cards videogames={videogames} />}
      </div>
    </div>
  );
}

export default App;
