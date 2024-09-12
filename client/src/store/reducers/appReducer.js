import actionTypes from "../actions/actionType";
const initState = {
  categories: [],
  msg: "",
  prices: [],
  areas: [],
  provinces: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      // case actionTypes.GET_POSTS:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };

    case actionTypes.GET_PRICES:
      return {
        ...state,
        prices: action.prices || [],
        msg: action.msg || "",
      };

    case actionTypes.GET_AREAS:
      return {
        ...state,
        areas: action.areas || [],
        msg: action.msg || "",
      };

    case actionTypes.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default appReducer;
