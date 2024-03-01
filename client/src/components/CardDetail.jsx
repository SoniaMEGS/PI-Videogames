import "../style/CardDetail.css";

const CardDetail = ({ videogameDetails }) => {
  const {
    id,
    name,
    background_image,
    platforms,
    description,
    description_raw,
    released,
    rating,
    genres,
  } = videogameDetails;
  return (
    <section id={id} className="cardDetail">
      <div className="cardDetailContainer">
        <div className="cardDetailContainer_p">
          <figure className="cardDetailContainer_img">
            <img
              src={background_image}
              alt={name}
              className="cardDetailContainer_img-videogames"
            />
          </figure>
          <article>
            <p className="cardDetailContainer_p-text">
              <span>ID: </span>
              {id}
            </p>
            <p className="cardDetailContainer_p-text">
              <span>Name: </span>
              {name}
            </p>
            <p className="cardDetailContainer_p-text">
              <span>Rating: </span>
              {rating}
            </p>
            <p className="cardDetailContainer_p-text">
              <span>Released: </span>
              {isNaN(id) ? released?.split("T")[0] : released}
            </p>
            <p className="cardDetailContainer_p-text">
              <span>Genres: </span>
              {isNaN(id)
                ? genres?.join(", ")
                : genres?.map((gen) => gen?.name).join(", ")}
            </p>
            <p className="cardDetailContainer_p-text">
              <span>Platforms: </span>
              {isNaN(id)
                ? platforms?.join(", ")
                : platforms?.map((plat) => plat?.platform?.name).join(", ")}
            </p>
          </article>
        </div>
        <article className="cardDetailContainer__description">
          <p className="cardDetailContainer_description-d">
            <span>Description: </span>
            {isNaN(id) ? description : description_raw}
          </p>
        </article>
      </div>
    </section>
  );
};

export default CardDetail;
