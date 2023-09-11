import {HOME_PAGE_REQUEST } from '../constants/home'
import { ADD, MINUS } from '../constants/counter'

import Taro from "@tarojs/taro";
import {baseUrl} from "../config";

const HOME_STATE = {
  result: {},
  num: 0
}

export default function home (state = HOME_STATE, action) {
  switch (action.type) {
    case HOME_PAGE_REQUEST:
      console.log(`============实际网络请求============= userInfo ${action.userInfo}  locationInfo ${action.locationInfo}`);
      return {
        ...state,
        home_data: action.result
      }
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}
