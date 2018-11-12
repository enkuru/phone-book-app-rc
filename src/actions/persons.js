import axios from 'axios';
import {API_BASE} from './../config/env';

export const FETCH_PERSONS = 'FETCH_PERSONS';
export const FETCH_PERSONS_PENDING = 'FETCH_PERSONS_PENDING';
export const FETCH_PERSONS_FULFILLED = 'FETCH_PERSONS_FULFILLED';
export const FETCH_PERSONS_REJECTED = 'FETCH_PERSONS_REJECTED';

export const DELETE_PERSON = 'DELETE_PERSON';
export const DELETE_PERSON_PENDING = 'DELETE_PERSON_PENDING';
export const DELETE_PERSON_FULFILLED = 'DELETE_PERSON_FULFILLED';
export const DELETE_PERSON_REJECTED = 'DELETE_PERSON_REJECTED';

export function fetchPersons() {
  return dispatch => {
    dispatch({
      type: FETCH_PERSONS,
      payload: axios.get(`${API_BASE}/persons`).then(res => res.data)
    })
  }
}

export function deletePerson(_id) {
  return dispatch => {
    dispatch({
      type: DELETE_PERSON,
      payload: axios.delete(`${API_BASE}/persons/${_id}`).then(res => res.data)
    })
  }
}