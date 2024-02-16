import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";

const usePlatforms = () => {
  const videogames = useSelector((state) => state.videogames);
  const [platformsList, setPlatformsList] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const platformsArray = [
        ...new Set(
          videogames.flatMap((element) =>
            element.platforms.map((elm) => elm.platform.name)
          )
        ),
      ];

      setPlatformsList(platformsArray);
    };

    fetchPlatforms();
  }, []);

  // Utilizamos useMemo para memoizar la lista de temperamentos
  const memoizedPlatforms = useMemo(() => platformsList, [platformsList]);

  return memoizedPlatforms;
};

export default usePlatforms;
