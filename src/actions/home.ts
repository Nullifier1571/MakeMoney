import {
  HOME_PAGE_REQUEST,
} from '../constants/home'

import {
  ADD,
  MINUS
} from '../constants/counter'
import Taro from "@tarojs/taro";
import {baseUrl} from "../config";

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}



export const requestHomePageData = (userInfo:{},locationInfo:{}) => {
  //在这里做异步网络请求

  return async dispatch => {
    try {
      const response = await Taro.request({
        url: `${baseUrl}/index/list/data`,
        method: 'GET', // 根据您的需求选择请求方法
        data: {
          limit: 10,
          page: 1,
          tabName: userInfo,
          location: locationInfo
        }
        // 可以添加其他请求参数，如 data、header 等
      });

      if (response.statusCode === 200) {
        // 请求成功，可以在这里处理返回的数据
        // 假设返回的数据中有一个字段 value
        const result = response.data;

        // 使用 dispatch 分发 action，将结果传递给 reducer
        dispatch({
          userInfo:userInfo,
          locationInfo:locationInfo,
          result:result,
          type: HOME_PAGE_REQUEST
        });
      } else {
        // 请求失败，可以进行错误处理
        console.error('请求失败:', response.statusCode);
        // 这里可以 dispatch 一个错误处理的 action
        dispatch({
          userInfo:userInfo,
          locationInfo:locationInfo,
          result:{"resultCode":-1},
          type: HOME_PAGE_REQUEST
        });
      }
    } catch (error) {
      // 发生异常，可以进行错误处理
      console.error('请求发生异常:', error);
      dispatch({
        userInfo:userInfo,
        locationInfo:locationInfo,
        result:{"resultCode":-2},
        type: HOME_PAGE_REQUEST
      });
      // 这里可以 dispatch 一个错误处理的 action
    }
  };
}


// 异步的action
export function asyncRequestHomePageData (userInfo:{},locationInfo:{}) {
  return dispatch => {
    dispatch(requestHomePageData(userInfo,locationInfo))
  }
}
