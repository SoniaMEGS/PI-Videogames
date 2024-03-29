import {
  SET_VIDEOGAMES,
  SET_LOADING,
  SET_SEARCH,
  SET_FILTERING,
  SET_SORTING,
} from "./types";

const initialState = {
  videogames: [],
  search: [],
  filtering: false,
  sorting: false,
  loading: false,
};

export const videogamesReducer = (state = initialState, actios) => {
  switch (actios.type) {
    case SET_VIDEOGAMES:
      return {
        ...state,
        videogames: actios.payload,
      };
    case SET_SEARCH:
      return { ...state, search: actios.payload };
    case SET_LOADING:
      return { ...state, loading: actios.payload };
    case SET_FILTERING:
      return { ...state, filtering: actios.payload };
    case SET_SORTING:
      return { ...state, sorting: actios.payload };
    default:
      return state;
  }
};
