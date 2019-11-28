import { GET_LYRICS, LYRICS_LOADING } from "../actions/types";

const initialState = {
  lyrics: String,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LYRICS:
      return {
        ...state,
        lyrics: action.payload,
        loading: false
      };
    case LYRICS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
