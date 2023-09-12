import {
  SUB_CATEGORY_PAGE_REQUEST,
} from '../constants/subcategory'
import Taro from "@tarojs/taro";

export function asyncRequestSubCategoryPageData(userInfo: {}, locationInfo: {}) {
  return async dispatch => {
    try {
      var result = await Taro.request({
        url: `/category/sub/data`,
        method: 'GET', // 根据您的需求选择请求方法
        data: {
          userInfo: userInfo,
          locationInfo: locationInfo
        }
      })

      if (result.statusCode == 200) {
        var data = result.data
        console.log("======二级大类请求成功====="+JSON.stringify(data))

        dispatch({
          userInfo: userInfo,
          locationInfo: locationInfo,
          result: data,
          type: SUB_CATEGORY_PAGE_REQUEST
        })
      } else {
        dispatch({
          userInfo: userInfo,
          locationInfo: locationInfo,
          result: {"statusCode": -1},
          type: SUB_CATEGORY_PAGE_REQUEST
        })
      }
    } catch (e) {
      dispatch({
        userInfo: userInfo,
        locationInfo: locationInfo,
        result: {"statusCode": -2},
        type: SUB_CATEGORY_PAGE_REQUEST
      })
    }
  }

}
