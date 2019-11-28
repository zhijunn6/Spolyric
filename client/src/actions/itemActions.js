//Make requests to the backend
import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    //call route
    .get("/api/items")
    .then(res =>
      dispatch({
        //send our type
        type: GET_ITEMS,
        payload: res.data //data from backend
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = ({
  songName,
  artistName,
  songImageArt,
  songLyrics
}) => dispatch => {
  console.log("From addItem!!!!!!!!!!");
  const body = JSON.stringify({
    songName,
    artistName,
    songImageArt,
    songLyrics
  });
  console.log(body);
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  //dispatch(setLyricsLoading());

  axios
    .post("/api/items/saveSongLyrics/", body, config)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
