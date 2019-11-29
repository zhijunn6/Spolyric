import axios from "axios";
import { GET_LYRICS, LYRICS_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const getLyrics = () => dispatch => {
  dispatch(setLyricsLoading());
  axios
    .get("/api/lyrics")
    .then(res =>
      dispatch({
        type: GET_LYRICS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getCurrentLyrics = ({ name, artistName }) => dispatch => {
  console.log("From CurrentLyrics: ");
  console.log(name);
  const body = JSON.stringify({ name, artistName });
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  dispatch(setLyricsLoading());

  axios
    .post("/api/lyrics", body, config)
    .then(res =>
      dispatch({
        type: GET_LYRICS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setLyricsLoading = () => {
  return {
    type: LYRICS_LOADING
  };
};
