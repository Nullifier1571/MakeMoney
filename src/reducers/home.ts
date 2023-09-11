import {HOME_PAGE_REQUEST } from '../constants/home'
import { ADD, MINUS } from '../constants/counter'

import Taro from "@tarojs/taro";
import {baseUrl} from "../config";

const HOME_STATE = {
  home_data: {},
  num: 0
}

export default function home (state = HOME_STATE, action) {
  switch (action.type) {
    case HOME_PAGE_REQUEST:
     /* const {
        data
      } = await Taro.request({
        url: `${baseUrl}/index/list/data`,
        data: {
          limit: 10,
          page: 1,
          tabName: action.userInfo,
          location:action.locationInfo
        }
      });*/
      // 确保 data 不为 undefined 后再获取 list 数据
      console.log(`============实际网络请求============= userInfo ${action.userInfo}  locationInfo ${action.locationInfo}`);
      const response = await Taro.request({
        url: `${baseUrl}/index/list/data`,
        data: {
          limit: 10,
          page: 1,
          tabName: action.userInfo,
          location: action.locationInfo
        }
      });

      return {
        ...state,
        home_data: {"a":{"index":1,"b":"----"}}
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
