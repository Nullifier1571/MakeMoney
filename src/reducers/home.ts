import {HOME_PAGE_REQUEST } from '../constants/home'

const HOME_STATE = {
  result: {},
}

export default function home (state = HOME_STATE, action) {
  switch (action.type) {
    case HOME_PAGE_REQUEST:
      console.log(`============实际网络请求============= userInfo ${action.userInfo}  locationInfo ${action.locationInfo}`);
      return {
        ...state,
        home_data: action.result
      }

    default:
      return state
  }
}
