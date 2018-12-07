import axios from 'axios';
import {API_BASE} from './../config/env';

export const LOAD_PERSON = 'LOAD_PERSON';

export const FETCH_PERSONS = 'FETCH_PERSONS';
export const FETCH_PERSONS_PENDING = 'FETCH_PERSONS_PENDING';
export const FETCH_PERSONS_FULFILLED = 'FETCH_PERSONS_FULFILLED';
export const FETCH_PERSONS_REJECTED = 'FETCH_PERSONS_REJECTED';

export const SAVE_PERSON = 'SAVE_PERSON';
export const SAVE_PERSON_PENDING = 'SAVE_PERSON_PENDING';
export const SAVE_PERSON_FULFILLED = 'SAVE_PERSON_FULFILLED';
export const SAVE_PERSON_REJECTED = 'SAVE_PERSON_REJECTED';

export const UPDATE_PERSON = 'UPDATE_PERSON';
export const UPDATE_PERSON_PENDING = 'UPDATE_PERSON_PENDING';
export const UPDATE_PERSON_FULFILLED = 'UPDATE_PERSON_FULFILLED';
export const UPDATE_PERSON_REJECTED = 'UPDATE_PERSON_REJECTED';

export const DELETE_PERSON = 'DELETE_PERSON';
export const DELETE_PERSON_PENDING = 'DELETE_PERSON_PENDING';
export const DELETE_PERSON_FULFILLED = 'DELETE_PERSON_FULFILLED';
export const DELETE_PERSON_REJECTED = 'DELETE_PERSON_REJECTED';

export function loadPerson(person) {
  return dispatch => {
    dispatch({
      type: LOAD_PERSON,
      payload: person
    })
  }
}

const fetchPersonList = (dispatch) => dispatch({
  type: FETCH_PERSONS,
  payload: axios.get(`${API_BASE}/persons`).then(res => res.data)
});

export function fetchPersons() {
  return dispatch => fetchPersonList(dispatch);
}

export function savePerson(person) {
  return dispatch => {
    dispatch({
      type: SAVE_PERSON,
      payload: axios.post(`${API_BASE}/persons`, person).then(res => res.data)
    }).then(() => fetchPersonList(dispatch))
  }
}

export function updatePerson(person) {
  return dispatch => {
    dispatch({
      type: UPDATE_PERSON,
      payload: axios.put(`${API_BASE}/persons/${person._id}`, person).then(res => res.data)
    }).then(() => fetchPersonList(dispatch))
  }
}

export function deletePerson(_id) {
  return dispatch => {
    dispatch({
      type: DELETE_PERSON,
      payload: axios.delete(`${API_BASE}/persons/${_id}`).then(res => res.data)
    }).then(() => fetchPersonList(dispatch))
  }
}