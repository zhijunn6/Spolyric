import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import lyricReducer from "./lyricReducer";

export default combineReducers({
  item: itemReducer,
  lyrics: lyricReducer,
  error: errorReducer,
  auth: authReducer
});
