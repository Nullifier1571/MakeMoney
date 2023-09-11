import {
  HOME_PAGE_REQUEST,
} from '../constants/home'

import {
  ADD,
  MINUS
} from '../constants/counter'

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
  return {
    userInfo:userInfo,
    locationInfo:locationInfo,
    test:"AAAAAAA",
    type: HOME_PAGE_REQUEST
  }
}


// 异步的action
export function asyncRequestHomePageData (userInfo:{},locationInfo:{}) {
  return dispatch => {
    dispatch(requestHomePageData(userInfo,locationInfo))
  }
}
