import axios from 'axios';
import {API_BASE} from './../config/env';

export const ADD_NUMBER = 'ADD_NUMBER';
export const EDIT_NUMBER = 'EDIT_NUMBER';
export const DELETE_NUMBER = 'DELETE_NUMBER';

export function addNumber(number) {
  return dispatch => {
    dispatch({
      type: ADD_NUMBER,
      payload: number
    })
  }
}

export function editNumber(index, number) {
  return dispatch => {
    dispatch({
      type: EDIT_NUMBER,
      payload: {index, number}
    })
  }
}

export function deleteNumber(index) {
  return dispatch => {
    dispatch({
      type: DELETE_NUMBER,
      payload: index
    })
  }
}