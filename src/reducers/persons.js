import * as personsActions from './../actions/persons';
import update from 'immutability-helper';

const initialState = {
  list: [],
  fetching: false,
  error: {},
  person: {firstName: '', lastName: '', email: '', numbers: []},
  modalOpen: false
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

    //LOAD_PERSON
    case personsActions.LOAD_PERSON:
      return {...state, person: action.payload, modalOpen: true};

    //SAVE PERSON
    case personsActions.SAVE_PERSON_PENDING:
      return {...state, fetching: true};
    case personsActions.SAVE_PERSON_FULFILLED:
      return update({...state, modalOpen: false, fetching: false}, {list: {$push: [action.payload]}});
    case personsActions.SAVE_PERSON_REJECTED:
      return {...state, fetching: false, error: action.payload};

    //UPDATE PERSON
    case personsActions.UPDATE_PERSON_PENDING:
      return {...state, fetching: true};
    case personsActions.UPDATE_PERSON_FULFILLED:
      const updatedIndex = state.list.findIndex(i => i._id === action.payload._id);
      return update({
        ...state, modalOpen: false, fetching: false
      }, {list: {[updatedIndex]: {number: {$set: action.payload}}}});
    case personsActions.UPDATE_PERSON_REJECTED:
      return {...state, fetching: false, error: action.payload};

    //DELETE PERSON
    case personsActions.DELETE_PERSON_PENDING:
      return {...state, fetching: true};
    case personsActions.DELETE_PERSON_FULFILLED:
      const deletedIndex = state.list.findIndex(i => i._id === action.payload._id);
      return update({...state, fetching: false}, {list: {$splice: [[deletedIndex, 1]]}});
    case personsActions.DELETE_PERSON_REJECTED:
      return {...state, fetching: false, error: action.payload};

    default:
      return state;
  }
}