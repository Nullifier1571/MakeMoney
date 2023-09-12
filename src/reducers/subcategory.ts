import { SUB_CATEGORY_PAGE_REQUEST } from '../constants/subcategory'

const INITIAL_STATE = {
  result: {}
}

export default function subcategory (state = INITIAL_STATE, action) {
  console.log(`============二级大类页数据返回=============${action} === ${JSON.stringify(action.result)}`);

  switch (action.type) {
    case SUB_CATEGORY_PAGE_REQUEST:
      return {
        ...state,
        data: action.result
      }
    default:
      return state
  }
}
