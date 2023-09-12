import { SUB_CATEGORY_PAGE_REQUEST } from '../constants/subcategory'

const INITIAL_STATE = {
  result: {}
}

export default function subcategory (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUB_CATEGORY_PAGE_REQUEST:
      console.log(`============二级大类页数据返回=============`);
      return {
        ...state,
        data: state.result
      }
    default:
      return state
  }
}
