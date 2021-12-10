import {
  CREATE_DYNAMIC_FIELD,
  GET_DYNAMIC_FIELDS,
  DYNAMIC_FIELD_DETAIL,
  DYNAMIC_FIELD_ERROR,
  DYNAMIC_FIELD_FLAG,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CREATE_DYNAMIC_FIELD:
      return {
        ...state,
        ...action.payload,
      };
    case DYNAMIC_FIELD_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case DYNAMIC_FIELD_FLAG:
      return {
        ...state,
        dynamicFieldFlag: action.payload,
      };
    case GET_DYNAMIC_FIELDS:
      return {
        ...state,
        dynamicFields: action.payload,
        loading: false
      };
    case DYNAMIC_FIELD_DETAIL:
      return {
        ...state,
        dynamicFieldDetail: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
