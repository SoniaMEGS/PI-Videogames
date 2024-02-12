import { useEffect, useState } from "react";
import CardDetail from "./CardDetail.jsx";
import Loader from "./Loader.jsx";
import { getVideogameByID } from "../api/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/actions.js";

const DetailData = () => {
  const [videogameDetails, setVideogameDetails] = useState({});
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  let { id } = useParams();
  //console.log()
  useEffect(() => {
    const fetchVideogameDetails = async () => {
      dispatch(setLoading(true));
      try {
        const videogamesRes = await getVideogameByID({ id });
        if (videogamesRes.id) {
          setVideogameDetails(videogamesRes);
        } else {
          window.alert("No hay juego con ese nombre");
        }
      } catch (error) {
        console.log(error);
        window.alert("No hay juego con ese nombre");
      }
      dispatch(setLoading(false));
    };
    fetchVideogameDetails();

    return setVideogameDetails({});
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div>
      <CardDetail videogameDetails={videogameDetails} />
    </div>
  );
};

export default DetailData;
