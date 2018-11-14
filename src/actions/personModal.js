export const LOAD_PERSON = 'LOAD_PERSON';

export function loadPerson(person) {
  return dispatch => {
    dispatch({
      type: LOAD_PERSON,
      payload: person
    })
  }
}