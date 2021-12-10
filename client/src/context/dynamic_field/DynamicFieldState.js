import React, { useReducer } from 'react';
import axios from 'axios';
import DynamicFieldContext from './dynamicFieldContext';
import dynamicFieldReducer from './dynamicFieldReducer';

import {
  CREATE_DYNAMIC_FIELD,
  GET_DYNAMIC_FIELDS,
  DYNAMIC_FIELD_DETAIL,
  DYNAMIC_FIELD_ERROR,
  DYNAMIC_FIELD_FLAG
} from '../types';

const DynamicFieldState = props => {
  const initialState = {
    isAuthenticated: null,
    loading: true,
    error: null,
    dynamicFieldFlag: false,
    dynamicFields: [],
    dynamicFieldDetail: null
  };

  const [state, dispatch] = useReducer(dynamicFieldReducer, initialState);

  // Create Dynamic Field
  const createDynamicField = async formData => {
    console.log("######Inside createDynamicField#####");
    console.log("formData", formData);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/dynamic_field', formData, config);
      console.log("Before Dispatch");
      console.log("res", res);
      dispatch({
        type: CREATE_DYNAMIC_FIELD,
        payload: res.data
      });
      dispatch({
        type: DYNAMIC_FIELD_FLAG,
        payload: true
      });
    } catch (err) {
      console.log("err", err);
      console.log("err.response", err.response);
      dispatch({
        type: DYNAMIC_FIELD_ERROR,
        payload: err.response.data.msg
      });
    }
  };


  // Get Dynamic Fields
  const getDynamicFields = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log("Inside frontend")
    try {
      console.log("Inside try frontend")
      const res = await axios.get('/api/dynamic_field', config);

      dispatch({
        type: GET_DYNAMIC_FIELDS,
        payload: res.data
      });
    } catch (err) {
      console.log("err", err)
      console.log("err.response", err.response)
      dispatch({
        type: DYNAMIC_FIELD_ERROR,
        payload: err.response.msg
      });
    }
  };


  // Dynamic Field Detail
  const getDynamicFieldDetail = async id => {
    //console.log("Test Get Details");
    try {
      const res = await axios.get(`/api/dynamic_field/${id}`);
      dispatch({
        type: DYNAMIC_FIELD_DETAIL,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: DYNAMIC_FIELD_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Errors
  const setUnsetDynamicFieldFlag = () => dispatch({ type: DYNAMIC_FIELD_FLAG, payload: false });

  return (
    <DynamicFieldContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        dynamicFieldFlag: state.dynamicFieldFlag,
        dynamicFields: state.dynamicFields,
        dynamicFieldDetail: state.dynamicFieldDetail,
        createDynamicField,
        getDynamicFields,
        getDynamicFieldDetail,
        setUnsetDynamicFieldFlag
      }}
    >
      {props.children}
    </DynamicFieldContext.Provider>
  );
};

export default DynamicFieldState;
