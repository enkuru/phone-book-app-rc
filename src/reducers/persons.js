import * as personsActions from './../actions/persons';

const initialState = {
  list: [],
  fetching: false,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    //FETCH PERSONS
    case personsActions.FETCH_PERSONS_PENDING:
      return {...state, fetching: true};
    case personsActions.FETCH_PERSONS_FULFILLED:
      return {...state, fetching: false, list: action.payload};
    case personsActions.FETCH_PERSONS_REJECTED:
      return {...state, fetching: false, error: action.payload};

    //DELETE PERSON
    case personsActions.DELETE_PERSON_PENDING:
      return {...state, fetching: true};
    case personsActions.DELETE_PERSON_FULFILLED:
      return {...state, fetching: false, list: state.list.filter(person => person._id !== action.payload._id)};
    case personsActions.DELETE_PERSON_REJECTED:
      return {...state, fetching: false, error: action.payload};

    default:
      return state;
  }
}