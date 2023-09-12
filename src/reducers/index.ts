import { combineReducers } from 'redux'
import counter from './counter'
import home from "./home";
import subcategory from "./subcategory";

export default combineReducers({
  counter,home,subcategory
})
