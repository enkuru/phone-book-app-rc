import * as personsActions from '../actions/persons';
import * as numbersActions from '../actions/numbers';
import update from 'immutability-helper';

const initialState = {
  person: {firstName: '', lastName: '', email: '', numbers: []}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case numbersActions.ADD_NUMBER:
      const number = {number: action.payload, owner: state.person._id};
      const afterAdd = update(state.person, {numbers: {$push: [number]}});
      return {...state, person: afterAdd};
    case numbersActions.EDIT_NUMBER:
      const afterEdit = update(state.person, {numbers: {[action.payload.index]: {number: {$set: action.payload.number}}}});
      return {...state, person: afterEdit};
    case numbersActions.DELETE_NUMBER:
      const afterDelete = update(state.person, {numbers: {$splice: [[action.payload, 1]]}});
      return {...state, person: afterDelete};
    default:
      return state;
  }
}