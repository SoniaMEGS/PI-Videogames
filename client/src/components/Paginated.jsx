import React from "react";
import "../style/Paginated.css";

const Paginated = (props) => {
  const { videogamesPerPage, currentPage, setCurrentPage, videogames } = props;
  // Verifica si videogames está definido y tiene contenido
  // if (!videogames || videogames.length === 0) {
  //   return null; // Renderiza null si no hay datos disponibles
  // }
  const totalVideogames = videogames.length;
  const pageNumbers = [];

  const numberOfPages = Math.ceil(totalVideogames / videogamesPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  const goToPrevious = () => {
    if (currentPage == 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNext = () => {
    if (currentPage == numberOfPages) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToSpecific = (n) => {
    setCurrentPage(n);
  };

  // Función para obtener los números de página a mostrar en la paginación
  const getPageNumbersToShow = () => {
    const maxPageButtons = 12; // Máximo número de botones de página a mostrar
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    let startPage = currentPage - halfMaxButtons;
    let endPage = currentPage + halfMaxButtons;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageButtons;
    } else if (endPage > numberOfPages) {
      endPage = numberOfPages;
      startPage = numberOfPages - maxPageButtons + 1;
    }

    return pageNumbers.slice(startPage - 1, endPage);
  };

  const pageNumbersToShow = getPageNumbersToShow();

  const goToFirstPage = () => {
    setCurrentPage(1); // Establece la página actual en la primera página
  };

  const goToLastPage = () => {
    setCurrentPage(numberOfPages); // Establece la página actual en la última página
  };

  return (
    <div className="paginated">
      <button className="paginated_prev" onClick={goToFirstPage}>
        First
      </button>
      <button className="paginated_prev" href="" onClick={goToPrevious}>
        Previous
      </button>
      <ul className="paginated_list">
        {pageNumbersToShow.map((noPage) => (
          <li key={noPage}>
            <button
              className={`paginated_list-num${
                currentPage === noPage ? "--active" : ""
              }`}
              href=""
              onClick={() => goToSpecific(noPage)}
            >
              {noPage}
            </button>
          </li>
        ))}
      </ul>
      <button className="paginated_next" href="" onClick={goToNext}>
        Next
      </button>
      <button className="paginated_prev" onClick={goToLastPage}>
        Last
      </button>
    </div>
  );
};

export default Paginated;
