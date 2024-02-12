import {
  SET_VIDEOGAMES,
  SET_LOADING,
  SET_SEARCH,
  SET_FILTERING,
} from "./types";

export const setVideogames = (payload) => ({
  type: SET_VIDEOGAMES,
  payload,
});
export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});
export const setSearch = (payload) => ({
  type: SET_SEARCH,
  payload,
});

export const setFiltering = (payload) => ({
  type: SET_FILTERING,
  payload,
});
