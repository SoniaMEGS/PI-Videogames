import "../style/Card.css";

const CardDetail = ({ videogameDetails }) => {
  const {
    id,
    name,
    background_image,
    platforms,
    description_raw,
    released,
    rating,
    genres,
  } = videogameDetails;

  return (
    <section id={id} className="cardContainer">
      <div>
        <img src={background_image} alt={name} />
        <div>
          <p>
            <span>ID: </span>
            {id}
          </p>
          <p>
            <span>Name: </span>
            {name}
          </p>
          <p>
            <span>Rating: </span>
            {rating}
          </p>
          <p>
            <span>Released: </span>
            {released}
          </p>
          <p>
            <span>Genres: </span>
            {genres?.map((gen) => gen?.name).join(", ")}
          </p>
          <p>
            <span>Platforms: </span>
            {platforms?.map((plat) => plat?.platform?.name).join(", ")}
          </p>
        </div>
      </div>
      <p>
        <span>Description: </span>
        {description_raw}
      </p>
    </section>
  );
};

export default CardDetail;
