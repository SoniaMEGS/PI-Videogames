import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getVideogame } from "../api/index";
import { setVideogames, setLoading } from "../redux/actions.js";
import Loader from "../components/Loader.jsx";
import Searcher from "../components/Searcher.jsx";
import Filter from "../components/Filter.jsx";
import Cards from "../components/Cards";
import "../style/Home.css";

const Home = () => {
  const videogames = useSelector((state) => state.videogames);
  const search = useSelector((state) => state.search);
  const loading = useSelector((state) => state.loading);
  const filtering = useSelector((state) => state.filtering);
  const sorting = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

  //Funcion que llama la api
  useEffect(() => {
    const fetchVideogames = async () => {
      dispatch(setLoading(true));
      const videogamesRes = await getVideogame(2);
      dispatch(setVideogames(videogamesRes));
      dispatch(setLoading(false));
    };

    fetchVideogames();
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="searcherFilter">
        <Searcher />
        <Filter />
      </div>
      <Cards videogames={filtering || sorting ? search : videogames} />
    </>
  );
};

export default Home;
